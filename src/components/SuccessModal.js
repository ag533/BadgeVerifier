import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const SuccessModal = ({ isOpen, onRequestClose }) => {
  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "25vh",
      fontSize: "calc(10px + 2vmin)",
      color: "black",
      fontWeight: 600,
      backgroundColor: "#e3e3dc",
      textAlign: "center",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyle}
      ariaHideApp={false}
    >
      <CloseButton onClick={onRequestClose}>×</CloseButton>
      <ContentContainer>
        <p>Your badge has been successfully added to your profile!</p>
        <p>Thank you for submitting.</p>
      </ContentContainer>
    </Modal>
  );
};

export default SuccessModal;
