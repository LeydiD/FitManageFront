import React, { createContext, useState, useContext } from "react";
import Modal from "../components/Modal.jsx";

const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState({
    show: false,
    title: "",
    body: "",
    type: "info",
  });

  const showModal = (title, body, type = "info") => {
    setModalData({
      show: true,
      title,
      body,
      type,
    });
  };

  const closeModal = () => {
    setModalData({ ...modalData, show: false });
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}

      <Modal
        show={modalData.show}
        title={modalData.title}
        body={modalData.body}
        type={modalData.type}
        onClose={closeModal}
      />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
