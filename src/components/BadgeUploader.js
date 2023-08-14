import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ImageModal from "./ImageModal";
import { LabelButton } from "./core/Button";
import { createCircularBadge } from "./../helper/CreateCircularBadge";
import { resizeImage } from "../helper/ResizeImage";
import { isUploadedFileAnImage } from "../helper/IsUploadedFileAnImage";
import { isImageInPNGFormat } from "../helper/IsImageInPNGFormat";
import { imageToPNG } from "../helper/ImageToPNG";
import { isImageOfRightSize } from "../helper/IsImageOfRightSize";
import { isImageInsideTheCircle } from "../helper/IsImageInsideTheCircle";
import { checkHappiness } from "../helper/CheckHappiness";

const BadgeUploader = () => {
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationError, setVerificationError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isImagePng, setIsImagePng] = useState(false);
  const [isImageOfCorrectSize, setIsImageOfCorrectSize] = useState(false);
  const [
    isImageVisiblePixelsInsideCircle,
    setIsImageVisiblePixelsInsideCircle,
  ] = useState(false);
  const [isImageBorderHappy, setIsImageBorderHappy] = useState(false);

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

  const handleImageExtension = () => {
    const pngFormat = imageToPNG(image);
    setImage(pngFormat);
    setIsImagePng(true);
    hideModal();
  };

  const handleImageSize = async () => {
    const correctSize = await resizeImage(image, 512, 512);
    setImage(correctSize);
    setIsImageOfCorrectSize(true);
    hideModal();
  };

  const handleImagePixelsInsideCircle = async () => {
    const insideCircle = await createCircularBadge(image);
    setImage(insideCircle);
    setIsImageVisiblePixelsInsideCircle(true);
    hideModal();
  };

  useEffect(() => {
    if (image) {
      revisitFlow();
    }
  }, [image]);

  const revisitFlow = async () => {
    setUploading(true);
    const uploadInterval = setInterval(() => {
      setUploadProgress((prevProgress) => Math.min(prevProgress + 5, 100));
    }, 300);

    let circularBorderImage = null;
    if (await isUploadedFileAnImage(image)) {
      if (await isImageInPNGFormat(image)) {
        setIsImagePng(true);
        if (await isImageOfRightSize(image)) {
          setIsImageOfCorrectSize(true);
          if (await isImageInsideTheCircle(image)) {
            setIsImageVisiblePixelsInsideCircle(true);
            if (await checkHappiness(image)) {
              setIsImageBorderHappy(true);
              openModal();
            } else {
              setIsImageBorderHappy(false);
              clearInterval(uploadInterval);
              setUploading(false);
              setUploadProgress(100);
              openModal();
            }
          } else {
            setIsImageVisiblePixelsInsideCircle(false);
            clearInterval(uploadInterval);
            setUploading(false);
            setUploadProgress(80);
            openModal();
          }
        } else {
          setIsImageOfCorrectSize(false);
          clearInterval(uploadInterval);
          setUploading(false);
          setUploadProgress(60);
          openModal();
        }
      } else {
        setIsImagePng(false);
        clearInterval(uploadInterval);
        setUploading(false);
        setUploadProgress(40);
        openModal();
      }
    } else {
      clearInterval(uploadInterval);
      setUploading(false);
      setUploadProgress(0);
      setVerificationError(
        "Invalid image format. We only support .png, .jpg or .jpeg"
      );
      setImage(null);
    }

    setUploading(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageData = reader.result;
        setImage(imageData);
      };

      reader.readAsDataURL(file);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
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
          accept=".png"
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
        isImagePNG={isImagePng}
        isImagePNGOfCorrectSize={isImageOfCorrectSize}
        isImagePNGVisiblePixelsInsideCircle={isImageVisiblePixelsInsideCircle}
        isImagePNGBorderHappy={isImageBorderHappy}
        convertImg={handleImageExtension}
        resizeImg={handleImageSize}
        adjustImageInsideCircle={handleImagePixelsInsideCircle}
      />
    </div>
  );
};

export default BadgeUploader;
