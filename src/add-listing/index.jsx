import Header from "@/components/Header";
import React, { useState } from "react";
import carDetails from "./../shared/carDetails.json";
import IconField from "./components/IconField";
import InputField from "./components/InputField";
import DropdownField from "./components/DropDownField";
import TextAreaField from "./components/TextAreaField";
import features from "./../Shared/features.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { BiLoaderAlt } from "react-icons/bi";

const AddListing = () => {
  const [formData, setFormData] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);
  const [carInfo, setCarInfo] = useState();
  const [loader, setLoader] = useState(false);

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
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10">
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
