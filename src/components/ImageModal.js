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
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const ImageModal = ({
  isOpen,
  onRequestClose,
  image,
  isImagePNG,
  isImagePNGOfCorrectSize,
  isImagePNGVisiblePixelsInsideCircle,
  isImagePNGBorderHappy,
  convertImg,
  resizeImg,
  adjustImageInsideCircle,
}) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  let modalMessage = "";
  let modalButtons = <></>;

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "60vh",
      width: "50vw",
      fontSize: "calc(10px + 2vmin)",
      color: "black",
      fontWeight: 600,
      backgroundColor: "#e3e3dc",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
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

  const resizeImageToCorrectDimensions = () => {};
  const useOurImageBorder = () => {};
  const adjustImage = () => {};

  if (isImagePNG) {
    if (isImagePNGOfCorrectSize) {
      if (isImagePNGVisiblePixelsInsideCircle) {
        if (isImagePNGBorderHappy) {
          modalMessage = "Congratulations! Your badge is ready to be uploaded";
          modalButtons = (
            <ButtonContainer>
              <LinkButton onClick={downloadImage}>Download</LinkButton>
              <LinkButton onClick={openSubmitModal}>Submit</LinkButton>
            </ButtonContainer>
          );
        } else {
          modalMessage = "OOPS! Please use happy colours";
          modalButtons = (
            <ButtonContainer>
              <LinkButton onClick={onRequestClose}>
                Use another picture
              </LinkButton>
            </ButtonContainer>
          );
        }
      } else {
        modalMessage = "OOPS! The image is not Circular";
        modalButtons = (
          <ButtonContainer>
            <LinkButton onClick={adjustImageInsideCircle}>
              Adjust Image
            </LinkButton>
            <LinkButton onClick={onRequestClose}>Close</LinkButton>
          </ButtonContainer>
        );
      }
    } else {
      modalMessage = "OOPS! Incorrect Dimensions.";
      modalButtons = (
        <ButtonContainer>
          <LinkButton onClick={resizeImg}>Resize Image</LinkButton>
          <LinkButton onClick={onRequestClose}>Close</LinkButton>
        </ButtonContainer>
      );
    }
  } else {
    modalMessage = "OOPS! We only upload images of PNG format.";
    modalButtons = (
      <ButtonContainer>
        <LinkButton onClick={convertImg}>Convert Image</LinkButton>
        <LinkButton onClick={onRequestClose}>Close</LinkButton>
      </ButtonContainer>
    );
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={modalStyle}
        ariaHideApp={false}
      >
        <CloseButton onClick={onRequestClose}>×</CloseButton>
        <p>{modalMessage}</p>
        <ImageContainer>
          <img
            src={image}
            style={{ width: "200px", height: "200px" }}
            alt="Uploaded Badge"
          />
          {modalButtons}
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
