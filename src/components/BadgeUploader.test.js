import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BadgeUploader from "./BadgeUploader";
import { isUploadedFileAnImage } from "../helper/IsUploadedFileAnImage";
import { resizeImage } from "../helper/ResizeImage";
import { createCircularBadge } from "../helper/CreateCircularBadge";

jest.mock("../helper/IsUploadedFileAnImage");
jest.mock("../helper/ResizeImage");
jest.mock("../helper/CreateCircularBadge");

describe("BadgeUploader", () => {
  beforeEach(() => {
    // Mock helper functions
    isUploadedFileAnImage.mockResolvedValue(true);
    resizeImage.mockResolvedValue("mockResizedImageData");
    createCircularBadge.mockResolvedValue("mockCircularBadge");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders upload button and displays error message for invalid image format", async () => {
    render(<BadgeUploader />);

    const uploadButton = screen.getByLabelText("Upload Avatar");

    expect(uploadButton).toBeInTheDocument();

    // Invalid image format
    isUploadedFileAnImage.mockResolvedValue(false);

    userEvent.upload(
      uploadButton,
      new File(["(mock image data)"], "mock.png", { type: "image/png" })
    );

    const errorMessage = await screen.findByText(/invalid image format/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
