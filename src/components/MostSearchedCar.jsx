import FakeData from "@/shared/FakeData";
import React from "react";
import CarItem from "./CarItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MostSearchedCar = () => {
 return (
   <div className="mx-24 hidden md:block">
     <h2 className="font-bold text-3xl text-center mt-16 mb-7">
       Most Wanted Cars
     </h2>
     <Carousel>
       <CarouselContent>
         {FakeData.carList.map((car, index) => (
           <CarouselItem
             key={index}
             className="basis-1/2 md:basis-1/3 lg:basis-1/4"
           >
             <CarItem car={car} />
           </CarouselItem>
         ))}
       </CarouselContent>
       <CarouselPrevious />
       <CarouselNext />
     </Carousel>
   </div>
 );
};

export default MostSearchedCar;
