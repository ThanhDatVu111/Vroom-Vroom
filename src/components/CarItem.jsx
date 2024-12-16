import React from "react";
import { Separator } from "./ui/separator";
import { LuFuel } from "react-icons/lu";
import { TbBrandSpeedtest } from "react-icons/tb";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOpenInNew } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
function CarItem({ car }) {
  return (
    <Link to={"/listing-details/" + car?.id}>
      <div className="rounded-xl bg-[#6f0320] border hover:shadow-md cursor-pointer">
        <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-sm text-white">
          New
        </h2>
        <img src={car?.image} width={380} height={250} />
        <div className="p-4">
          <h2 className="font-bold text-white text-lg mb-2">{car?.name}</h2>
          <Separator />
          <div className="grid md:grid-cols-3 mt-5">
            <div className="flex flex-col items-center">
              <LuFuel className="text-lg mb-2 text-white" />
              <h2 className="text-white">{car?.miles} Miles</h2>
            </div>
            <div className="flex flex-col items-center">
              <TbBrandSpeedtest className="text-lg mb-2 text-white" />
              <h2 className="text-white">{car?.fuelType} </h2>
            </div>
            <div className="flex flex-col items-center text-white">
              <GiGearStickPattern className="text-lg mb-2" />
              <h2 className="text-white">{car?.gearType} </h2>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl text-white">${car.price}</h2>
            <h2 className="text-white text-sm flex gap-2 items-center">
              View Details <MdOpenInNew />
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarItem;
