import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import SuccessModal from "./SuccessModal";
import { LinkButton } from "./core/Button";

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column; /* Align the download button below the image */
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row; /* Align the download button below the image */
  align-items: center;
  padding: 1.5rem;
`;

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "40vh",
      fontSize: "calc(10px + 2vmin)",
      color: "black",
      fontWeight: 600,
      backgroundColor: "#e3e3dc",
      textAlign: "center",
    },
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "badge.png";
    link.click();
  };

  const openUploadModal = () => {
    setUploadModalOpen(true);
    onRequestClose();
  };

  const openSubmitModal = () => {
    setSubmitModalOpen(true);
    onRequestClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={modalStyle}
        ariaHideApp={false}
      >
        <CloseButton onClick={onRequestClose}>×</CloseButton>
        <p>Congratulations you have created your badge!</p>
        <ImageContainer>
          <img
            src={image}
            style={{ width: "20vh", height: "20vh" }}
            alt="Uploaded Badge"
          />
          <ButtonContainer>
            <LinkButton onClick={downloadImage}>Download</LinkButton>
            <LinkButton onClick={openSubmitModal}>Submit</LinkButton>
          </ButtonContainer>
        </ImageContainer>
      </Modal>
      {submitModalOpen && (
        <SuccessModal
          isOpen={submitModalOpen}
          onRequestClose={() => setSubmitModalOpen(false)}
        />
      )}
    </>
  );
};

export default ImageModal;
