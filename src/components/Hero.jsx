import React from "react";
import Search from "./Search";

function Hero() {
  return (
    <div>
      <div
        className="flex flex-col items-center p-10 py-20
         gap-6 h-[650px] w-full bg-[#6f0320]"
      >
        <h2 className="text-[60px] font-bold text-white">
          Your Next Adventure Starts Here
        </h2>

        <Search />
        <img
          src="/ferrari.png"
          className="w-[1400px] h-auto mt-[-20px] md:mt-[-40px]"
          alt="Ferrari"
        />
      </div>
    </div>
  );
}

export default Hero;
