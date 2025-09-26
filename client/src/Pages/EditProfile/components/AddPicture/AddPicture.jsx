import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const AddPicture = ({ userPicture }) => {
  const [picture, setPicture] = useState("");
  const [preview, setPreview] = useState(userPicture);
  const [message, setMessage] = useState(""); // To show success or error message
  const userId = JSON.parse(localStorage.getItem("UserIds")).userId; // Assuming you have the userId stored in localStorage

  useEffect(() => {
    axios
      .get(
        `https://music-cart-backend-5.onrender.com/api/v1/_USERS/${
          JSON.parse(localStorage.getItem("UserIds")).userId
        }`
      )
      .then((res) => {
        console.log(res);
        setPreview(res.data.data.photo);
      });
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      setPreview(URL.createObjectURL(file)); // To show a preview of the selected image

      // Automatically trigger upload after file selection
      await handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      setMessage("Please select a file first!");
      toast("Please select a file");
      return;
    }

    const formData = new FormData(); // Create FormData object
    formData.append("photo", file); // Append the file
    formData.append("userId", userId); // Append the userId

    try {
      // Send the form data to the backend via a POST request
      const response = await axios.post(
        "http://localhost:8000/api/v1/profile/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
            userId: userId,
          },
        }
      );

      // You can directly access the data in the response
      if (response.status === 200) {
        toast("Picture Updated");
      }
    } catch (error) {
      toast("Error uploading file: " + error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full relative">
      <img
        className="rounded-full h-48 w-48 lg:h-96 lg:w-96"
        src={preview}
        alt="profile"
      />

      {/* FaPlusCircle icon positioned at the bottom-right */}
      <label className="absolute bottom-0 right-0 flex flex-col justify-center items-center">
        <FaPlusCircle size={30} color="#972fff" />
        <input
          type="file"
          name="photo"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default AddPicture;
