import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { db } from "./../../../configs";
import { CarImages, CarListing } from "./../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "@/Shared/Service";
import CarItem from "@/components/CarItem";
import { FaTrashAlt } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function MyListing() {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);
  const [deleteCarId, setDeleteCarId] = useState(null); // To track the car being deleted

  useEffect(() => {
    user && GetUserCarListing();
  }, [user]);
  const GetUserCarListing = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(CarListing.id));

    const resp = Service.FormatResult(result);
    console.log(resp);
    setCarList(resp);
  };

  const handleDelete = async () => {
    if (deleteCarId) {
      // Delete related car images first
      await db.delete(CarImages).where(eq(CarImages.carListingId, deleteCarId));

      // Now delete the car listing
      await db.delete(CarListing).where(eq(CarListing.id, deleteCarId));

      // Update the car list state to remove the deleted car
      setCarList((prevCarList) =>
        prevCarList.filter((car) => car.id !== deleteCarId)
      );

      // Reset the deleteCarId state after deletion
      setDeleteCarId(null);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Current Listing</h2>
        <Link to={"/add-listing"}>
          <Button>+ Add New Listing</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
        {carList.map((item, index) => (
          <div key={index}>
            <CarItem car={item} />
            <div className="p-2 bg-[#6f0320] rounded-lg flex justify-between gap-3">
              {/*Edit Button */}
              <Link
                to={"/add-listing?mode=edit&id=" + item?.id}
                className="w-full"
              >
                <Button variant="outline" className="w-full bg-gray-100">
                  Edit
                </Button>
              </Link>
              {/* Alert Dialog and Delete Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    onClick={() => setDeleteCarId(item?.id)} // Set the car ID to be deleted
                  >
                    <FaTrashAlt />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the car listing and its associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDeleteCarId(null)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete} // Handle the delete action
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListing;
