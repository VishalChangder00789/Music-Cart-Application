import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "./contexts/ModalContext";

const Modal = () => {
  const { ModalContextComponent, isModalOpen, setIsModalOpen } =
    useContext(ModalContext);

  if (!isModalOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal-background") {
      setIsModalOpen(false);
    }
  };

  return ReactDOM.createPortal(
    <div
      id="modal-background"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="relative p-4">{ModalContextComponent}</div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
