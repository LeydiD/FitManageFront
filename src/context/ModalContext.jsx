import React, { createContext, useState, useContext } from "react";
import Modal from "../components/Modal.jsx";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState({
    show: false,
    title: "",
    body: "",
  });

  const showModal = (title, body) => {
    setModalData({ show: true, title, body });
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
        onClose={closeModal}
      />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
