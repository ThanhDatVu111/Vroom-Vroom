import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { storage } from "./../../../configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CarImages } from "./../../../configs/schema";
import { db } from "./../../../configs"; //default entry point

function UploadImages({ triggerUploadImages, setLoader }) {
  const [selectedFileList, setSelectedFileList] = useState([]);
  //const [EditCarImageList, setEditCarImageList] = useState([]);

  useEffect(() => {
    if (triggerUploadImages) {
      console.log("Trigger detected, calling UploadImageToServer...");
      UploadImageToServer();
    }
  }, [triggerUploadImages]);

  const onFileSelected = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setSelectedFileList((prev) => [...prev, file]);
    }
  };

  const onImageRemove = (image, index) => {
    const result = selectedFileList.filter((item) => item != image);
    {
      /*It excludes the image that matches the image argument by returning all other items (item != image).
    result will contain the remaining images after the unwanted one is removed.*/
    }
    setSelectedFileList(result);
  };

  const UploadImageToServer = async () => {
    setLoader(true);
    await selectedFileList.forEach(async (file) => {
      const fileName = Date.now() + ".jpeg";
      const storageRef = ref(storage, "vroom_img/" + fileName);
      const metaData = {
        contentType: "image/jpeg",
      };
      try {
        // Upload file to Firebase Storage
        const snapShot = await uploadBytes(storageRef, file, metaData);
        console.log("Uploaded File to Firebase Storage"); // Log successful upload

        // Get the download URL after the upload
        const downloadUrl = await getDownloadURL(storageRef);
        console.log("Download URL:", downloadUrl); // Log the download URL

        // Insert the image URL into the DB
        const result = await db.insert(CarImages).values({
          imageUrl: downloadUrl,
          carListingId: triggerUploadImages,
        });
        console.log("Inserted img successfully into DB:", result); // Log successful DB insertion
      } catch (error) {
        console.error("Error during upload or DB insert:", error); // Log any errors
      }
    });

    setLoader(false);
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {selectedFileList.map((image, index) => (
          <div key={index}>
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white"
              onClick={() => onImageRemove(image, index)}
            />
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[130px] object-cover rounded-xl"
            />
          </div>
        ))}
        {/* {The visible styled div (the + block) acts as a clickable element.
            When clicked, it triggers the hidden file input (<input type="file">) because the <label> is associated with it.
            Users select files, and the onChange event fires, executing the onFileSelected function.} */}
        <label htmlFor="upload-images">
          <div
            className="border rounded-xl border-dotted
                 border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md"
          >
            <h2 className="text-lg text-center text-primary">+</h2>
          </div>
        </label>
        <input
          type="file"
          multiple={true}
          id="upload-images"
          onChange={onFileSelected}
          className="opacity-0"
        />
      </div>
    </div>
  );
}

export default UploadImages;
