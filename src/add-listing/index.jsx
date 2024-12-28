import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import carDetails from "./../shared/carDetails.json";
import IconField from "./components/IconField";
import InputField from "./components/InputField";
import DropdownField from "./components/DropDownField";
import TextAreaField from "./components/TextAreaField";
import features from "./../Shared/features.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { db } from "./../../configs";
import { CarImages, CarListing } from "./../../configs/schema";
import { Separator } from "@/components/ui/separator";
import UploadImages from "./components/UploadImages";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";
import { eq } from "drizzle-orm";
import Service from "@/Shared/Service";

const AddListing = () => {
  const [formData, setFormData] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);
  const [carInfo, setCarInfo] = useState();
  const [triggerUploadImages, setTriggerUploadImages] = useState();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
    if (mode == "edit") {
      GetListingDetail();
    }
  }, []);

  const GetListingDetail = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, recordId));

    const resp = Service.FormatResult(result);
    setCarInfo(resp[0]);
    setFormData(resp[0]);
    setFeaturesData(resp[0].features);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(formData);
  };

  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    setLoader(true);
    e.preventDefault(); // Prevents the form from being submitted traditionally (check for required fields) and stops page reload.
    console.log(formData);
    toast({
      title: "Save into our database",
      description: "Please Wait...",
    });
    if (mode == "edit") {
      const result = await db
        .update(CarListing)
        .set({
          ...formData,
          features: featuresData,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          userImageUrl: user?.imageUrl,
          postedOn: moment().format("DD/MM/yyyy"),
        })
        .where(eq(CarListing.id, recordId))
        .returning({ id: CarListing.id });
      setTriggerUploadImages(result[0]?.id);
      console.log("Data Saved");
      navigate("/profile");
      setLoader(false);
    } else {
      try {
        const result = await db
          .insert(CarListing)
          .values({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: moment().format("DD/MM/yyyy"),
          })
          .returning({ id: CarListing.id });
        if (result) {
          setTriggerUploadImages(result[0]?.id);
          console.log("Data Saved");
          setLoader(false);
        }
      } catch (e) {
        setLoader(false);
        toast({
          title: "Error",
          description: "Please fill all required fields",
        });
        console.error("Error", e);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border border-[#6f0320] shadow-md rounded-xl mt-10">
          {/* Car Details  */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm flex gap-2 items-center mb-1">
                    <IconField icon={item?.icon} />
                    {item?.label}{" "}
                    {item.required && <span className="text-red-500">*</span>}{" "}
                  </label>
                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "dropdown" ? (
                    <DropdownField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "textarea" ? (
                    <TextAreaField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          {/* features List  */}
          <Separator className="my-6" />
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.name, value)
                    }
                    checked={featuresData?.[item.name]}
                  />{" "}
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>
          {/* Car Images  */}
          <Separator className="my-6" />
          <UploadImages
            carInfo={carInfo}
            mode={mode}
            triggerUploadImages={triggerUploadImages}
            setLoader={(v) => {
              setLoader(v);
              navigate("/profile");
            }}
          />
          {/* Submit button  */}
          <Separator className="my-6" />
          <div className="mt-10 flex justify-end">
            <Button
              type="button"
              disabled={loader}
              onClick={(e) => onSubmit(e)}
            >
              {!loader ? (
                "Submit"
              ) : (
                <BiLoaderAlt className="animate-spin text-lg" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
