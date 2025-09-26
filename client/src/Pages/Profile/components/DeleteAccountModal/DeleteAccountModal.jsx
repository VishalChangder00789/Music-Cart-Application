import React, { useContext } from "react";
import { ModalContext } from "../../../../CommonComponents/Modal/contexts/ModalContext";
import axios from "axios";

const DeleteAccountModal = () => {
  const { setIsModalOpen } = useContext(ModalContext);

  const handleAccountDeletion = async () => {
    const response = await axios.post(
      `http://localhost:8001/api/v1/delete-account`,
      {
        userId: JSON.parse(localStorage.getItem("UserIds")).userId,
        userSetting: true,
      }
    );

    console.log(response);
  };

  return (
    <div className="w-[350px] lg:w-[450px] lg:min-h-[150px] min-h-[150px]  p-4 flex flex-col justify-between items-center bg-white rounded-lg">
      <div className="font-semibold w-full">
        Are you sure you want to delete your account ?
      </div>
      <div className="flex w-full justify-evenly mb-4 mt-10">
        <button
          onClick={handleAccountDeletion}
          className="p-2 w-1/3 bg-red-600 text-white rounded-md"
        >
          Continue
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="p-2 w-1/3 text-white rounded-md bg-gray-400 "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
