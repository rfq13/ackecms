import React from "react";
import ReactModal from "react-modal";
import CloseIcon from "../icons/close";

ReactModal.setAppElement("#root");

function Modal(
  props = {
    isOpen: false,
    setIsOpen: () => {},
    title: "",
    subTitle: "",
    children: null,
    width: "50%",
    isLoading: false,
  },
) {
  const { title, isOpen, setIsOpen, children, width, isLoading } = props;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      width,
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#00000080",
    },
  };

  function closeModal() {
    if (isLoading) return;
    setIsOpen(false);
  }

  return (
    <ReactModal
      closeTimeoutMS={200}
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="relative">
        <h4 className="text-lg font-bold text-center w-full border-b py-4 border-b-gray-600">
          {title}
        </h4>
        <CloseIcon
          className="absolute top-4 right-4 h-6 w-6 cursor-pointer"
          color="black"
          onClick={closeModal}
        />
        {children}
      </div>
    </ReactModal>
  );
}

export default Modal;
