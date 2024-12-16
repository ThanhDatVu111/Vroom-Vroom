import Data from "@/Shared/Data";
import React from "react";
import { Link } from "react-router-dom";

function Category() {
  return (
    <div className="mt-40">
      <h2 className="font-bold text-3xl text-center mb-6">
        Explore Cars That Match Your Style
      </h2>
      <div
        className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6
        lg:grid-cols-9 gap-6 px-20"
      >
        {Data.Category.map((category, index) => (
          <Link to={"search/" + category.name}>
            <div
              className="border bg-[#6f0320] rounded-xl p-3 
                items-center flex flex-col hover:bg-[#4a0215] cursor-pointer text-white"
            >
              <img
                src={category.icon}
                width={35}
                height={35}
                className="filter brightness-0 invert"
              />
              <h2 className="mt-2">{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
