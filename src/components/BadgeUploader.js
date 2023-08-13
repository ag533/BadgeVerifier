import React, { useState } from "react";
import styled from "styled-components";
import ImageModal from "./ImageModal";
import { LabelButton } from "./core/Button";
import { createAngledGradientBorder } from "./../helper/CreateAngledGradiantBorder";
import { createCircularBadge } from "./../helper/CreateCircularBadge";
import { resizeImage } from "../helper/ResizeImage";
import { verifyBadgeFormat } from "../helper/VerifyBadgeFormat";

const BadgeUploader = () => {
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationError, setVerificationError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const containerStyle = {
    textAlign: "center",
    padding: "2rem",
  };

  const imageUploadStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1rem",
  };

  const uploadedImageStyle = {
    maxWidth: "50%",
    marginTop: "1rem",
    border: "2px solid #E1AB2C",
    borderRadius: "50%",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageData = reader.result;
        setUploading(true);
        setVerificationError(null);
        setUploadProgress(0);

        // Simulate image upload progress
        const uploadInterval = setInterval(() => {
          setUploadProgress((prevProgress) => Math.min(prevProgress + 10, 100));
        }, 300);

        let circularBorderImage = null;
        if (await verifyBadgeFormat(imageData)) {
          clearInterval(uploadInterval);
          setUploadProgress(100);
          const resizedImageData = await resizeImage(imageData, 482, 482);
          const circularBadge = await createCircularBadge(resizedImageData);
          const gradientColors = [
            "Red",
            "orange",
            "yellow",
            "green",
            "blue",
            "indigo",
            "violet",
          ]; // Customize with your desired colors
          circularBorderImage = await createAngledGradientBorder(
            imageData,
            gradientColors,
            45
          );

          // Set the circular border image as the image state
          setImage(circularBorderImage);

          setVerificationError(null);
        } else {
          clearInterval(uploadInterval);
          setUploadProgress(0);
          setVerificationError(
            "Invalid image format. We only support .png, .jpg or .jpeg"
          );
          setImage(null);
        }

        setUploading(false);
        if (circularBorderImage && !verificationError) {
          openModal();
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImage(null); // Reset image state
    setVerificationError(null); // Reset verification error state
    setUploading(false); // Reset uploading state
    setUploadProgress(0); //
  };

  return (
    <div style={containerStyle}>
      <div style={imageUploadStyle}>
        <input
          id="fileInput"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <LabelButton htmlFor="fileInput" onClick={closeModal}>
          Upload Avatar
        </LabelButton>
      </div>
      {verificationError && (
        <p style={{ color: "red", fontSize: "calc(1px + 2vmin)" }}>
          {verificationError}
        </p>
      )}
      {uploading && <progress value={uploadProgress} max="100" />}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={image}
      />
    </div>
  );
};

export default BadgeUploader;
