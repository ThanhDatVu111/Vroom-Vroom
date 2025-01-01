import Service from "@/Shared/Service";
import { db } from "./../../configs";
import { CarImages, CarListing } from "./../../configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Search from "@/components/Search";
import CarItem from "@/components/CarItem";

function SearchByOptions() {
  const [searchParam] = useSearchParams();
  const [carList, setCarList] = useState([]);
  const condition = searchParam.get("cars");
  const make = searchParam.get("make");

  useEffect(() => {
    GetCarList();
  }, [searchParam]); //Add searchParam as a dependency to re-run when URLquery changes

  // Scroll to the top whenever the component is re-rendered
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParam]);

  const GetCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(condition != undefined && eq(CarListing.condition, condition))
      .where(make != undefined && eq(CarListing.make, make));

    const resp = Service.FormatResult(result);
    console.log(resp);
    setCarList(resp);
  };

  return (
    <div>
      <Header />
      <div className="p-16 bg-[#6f0320] flex justify-center">
        <Search />
      </div>
      <div className="p-10 md:px-20">
        <h2 className="font-bold text-4xl "> Search Your Dream Car</h2>

        {/* List of CarList  */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
          {carList?.length > 0
            ? carList.map((item, index) => (
                <div key={index}>
                  <CarItem car={item} />
                </div>
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div className="h-[320px] rounded-xl bg-slate-200 animate-pulse"></div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default SearchByOptions;

{
/*Without useEffect:
If you call GetCarList directly (without useEffect), it will:
Fetch the data.
Call setCarList to update the state (carList).
Trigger a re-render because the state has changed.
The problem: If GetCarList is called directly inside the component's body (not wrapped in useEffect), then every time the component re-renders (due to any state or prop change), GetCarList will be called again, leading to a potential infinite loop of fetching and re-rendering, because each time you call setCarList, it triggers a re-render, which calls GetCarList again.

With useEffect:
When you wrap GetCarList inside useEffect with an empty dependency array ([]), it runs only once after the initial mount, i.e., the first time the component renders.
This means:
The initial render will happen without fetching the data.
After the component mounts, useEffect triggers and calls GetCarList to fetch the data.
After fetching, the state (carList) is updated, which triggers a single re-render to update the UI.
The key difference is that useEffect prevents repeated calls to GetCarList during every re-render, stopping the infinite loop.

In summary:
Without useEffect, calling GetCarList directly inside the component body can cause an infinite loop of re-renders and fetches.
With useEffect, GetCarList is called only once after the initial render, preventing the loop and triggering only one re-render after the state update.*/
}