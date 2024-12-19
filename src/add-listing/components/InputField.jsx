import { Input } from "@/components/ui/input";
import React from "react";

function InputField({ item, handleInputChange, carInfo }) {
  return (
    <div>
      <Input
        type={item?.fieldType}
        name={item?.name}
        required={item?.required} //The required attribute tells the browser that this input is mandatory.
        defaultValue={carInfo?.[item.name]}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
      />
    </div>
  );
}

export default InputField;
