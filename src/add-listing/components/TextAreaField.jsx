import React from "react";
import { Textarea } from "@/components/ui/textarea";

function TextAreaField({ item, handleInputChange, carInfo }) {
  return (
    <div>
      <Textarea
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        required={item.required} //The required attribute tells the browser that this input is mandatory.
        defaultValue={carInfo?.[item.name]}
      />
    </div>
  );
}

export default TextAreaField;
