import React, { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [ModalContextComponent, setModalContextComponent] = useState("");
  const [modalContext, setModalContext] = useState("Hello");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        modalContext,
        setModalContext,
        isModalOpen,
        setIsModalOpen,
        ModalContextComponent,
        setModalContextComponent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
