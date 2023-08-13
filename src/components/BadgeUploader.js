import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ImageModal from "./ImageModal";
import { LabelButton } from "./core/Button";
import { createAngledGradientBorder } from "./../helper/CreateAngledGradiantBorder";
import { createCircularBadge } from "./../helper/CreateCircularBadge";
import { resizeImage } from "../helper/ResizeImage";
import { verifyBadgeFormat } from "../helper/VerifyBadgeFormat";
import { verifyPngFormat } from "../helper/verifyPngFormat";
import { formatConverter } from "../helper/FormatConverter";
import { verifySize } from "../helper/VerifySize";
import { imageVerification } from "../helper/ImageVerification";

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
  const [isImageBorderHappy, setIsImageBorderHappy] = useState(true);

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
    const pngFormat = formatConverter(image);
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
    const uploadInterval = setInterval(() => {
      setUploadProgress((prevProgress) => Math.min(prevProgress + 1, 100));
    }, 3000);

    let circularBorderImage = null;
    if (await verifyBadgeFormat(image)) {
      clearInterval(uploadInterval);
      setUploadProgress(20);
      // const resizedImageData = await resizeImage(imageData, 482, 482);
      // const circularBadge = await createCircularBadge(resizedImageData);
      // const gradientColors = [
      //   "Red",
      //   "orange",
      //   "yellow",
      //   "green",
      //   "blue",
      //   "indigo",
      //   "violet",
      // ]; // Customize with your desired colors
      // circularBorderImage = await createAngledGradientBorder(
      //   imageData,
      //   gradientColors,
      //   45
      // );

      // Set the circular border image as the image state
      if (await verifyPngFormat(image)) {
        setIsImagePng(true);
        clearInterval(uploadInterval);
        setUploadProgress(40);
        if (await verifySize(image)) {
          setIsImageOfCorrectSize(true);
          clearInterval(uploadInterval);
          setUploadProgress(60);
          if (await imageVerification(image)) {
            setIsImageVisiblePixelsInsideCircle(true);
            clearInterval(uploadInterval);
            setUploadProgress(80);
          } else {
            setIsImageVisiblePixelsInsideCircle(false);
            clearInterval(uploadInterval);
            setUploadProgress(0);
            openModal();
          }
        } else {
          setIsImageOfCorrectSize(false);
          clearInterval(uploadInterval);
          setUploadProgress(0);
          openModal();
        }
      } else {
        setIsImagePng(false);
        clearInterval(uploadInterval);
        setUploadProgress(0);
        openModal();
      }
    } else {
      clearInterval(uploadInterval);
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
        setUploading(true);
        setVerificationError(null);
        setUploadProgress(0);

        // Simulate image upload progress
        const uploadInterval = setInterval(() => {
          setUploadProgress((prevProgress) => Math.min(prevProgress + 1, 100));
        }, 3000);

        let circularBorderImage = null;
        if (await verifyBadgeFormat(imageData)) {
          clearInterval(uploadInterval);
          setUploadProgress(20);
          // const resizedImageData = await resizeImage(imageData, 482, 482);
          // const circularBadge = await createCircularBadge(resizedImageData);
          // const gradientColors = [
          //   "Red",
          //   "orange",
          //   "yellow",
          //   "green",
          //   "blue",
          //   "indigo",
          //   "violet",
          // ]; // Customize with your desired colors
          // circularBorderImage = await createAngledGradientBorder(
          //   imageData,
          //   gradientColors,
          //   45
          // );

          // Set the circular border image as the image state
          setImage(imageData);
          if (await verifyPngFormat(imageData)) {
            setIsImagePng(true);
            clearInterval(uploadInterval);
            setUploadProgress(40);
            if (await verifySize(imageData)) {
              setIsImageOfCorrectSize(true);
              clearInterval(uploadInterval);
              setUploadProgress(60);
              if (await imageVerification(imageData)) {
                setIsImageVisiblePixelsInsideCircle(true);
                clearInterval(uploadInterval);
                setUploadProgress(80);
              } else {
                clearInterval(uploadInterval);
                setUploadProgress(0);
                openModal();
              }
            } else {
              clearInterval(uploadInterval);
              setUploadProgress(0);
              openModal();
            }
          } else {
            clearInterval(uploadInterval);
            setUploadProgress(0);
            openModal();
          }
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
