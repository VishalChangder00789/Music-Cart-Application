import axios from "axios";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const AddPicture = () => {
  const [picture, setPicture] = useState("");
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState(""); // To show success or error message
  const userId = JSON.parse(localStorage.getItem("UserIds")).userId; // Assuming you have the userId stored in localStorage

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      setPreview(URL.createObjectURL(file)); // To show a preview of the selected image
    }
  };

  const handleUpload = async () => {
    if (!picture) {
      setMessage("Please select a file first!");
      return;
    }

    console.log(userId);

    const formData = new FormData(); // Create FormData object
    formData.append("photo", picture); // Append the file
    formData.append("userId", userId); // Append the userId

    try {
      // Send the form data to the backend via a POST request
      const response = await axios.post(
        "https://music-cart-backend-5.onrender.com/api/v1/profile/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
            userId: userId,
          },
        }
      );

      console.log(response);

      // You can directly access the data in the response
      if (response.status === 200) {
        setMessage("File uploaded successfully!");
      } else {
        setMessage(response.data.message || "Error uploading file");
      }
    } catch (error) {
      setMessage("Error uploading file: " + error.message);
    }
  };

  return (
    <div className="flex flex-col border justify-center items-center w-full h-full">
      <label className="flex flex-col justify-center items-center">
        {preview ? (
          <img className="rounded-full" src={preview} alt="profile" />
        ) : (
          <FaPlusCircle size={40} color="#972fff" />
        )}
        <input
          type="file"
          name="photo"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Button to trigger file upload */}
      <button
        className="mt-10 p-2 bg-blue-500 text-white rounded"
        onClick={handleUpload}
      >
        Upload Photo
      </button>

      {/* Show success or error message */}
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AddPicture;
