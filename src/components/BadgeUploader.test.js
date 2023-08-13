import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BadgeUploader from "./BadgeUploader";
import { verifyBadgeFormat } from "../helper/VerifyBadgeFormat";
import { resizeImage } from "../helper/ResizeImage";
import { createCircularBadge } from "../helper/CreateCircularBadge";
import { createAngledGradientBorder } from "../helper/CreateAngledGradiantBorder";

jest.mock("../helper/VerifyBadgeFormat");
jest.mock("../helper/ResizeImage");
jest.mock("../helper/CreateCircularBadge");
jest.mock("../helper/CreateAngledGradiantBorder");

describe("BadgeUploader", () => {
  beforeEach(() => {
    // Mock helper functions
    verifyBadgeFormat.mockResolvedValue(true);
    resizeImage.mockResolvedValue("mockResizedImageData");
    createCircularBadge.mockResolvedValue("mockCircularBadge");
    createAngledGradientBorder.mockResolvedValue("mockCircularBorderImage");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders upload button and displays error message for invalid image format", async () => {
    render(<BadgeUploader />);

    const uploadButton = screen.getByLabelText("Upload Avatar");

    expect(uploadButton).toBeInTheDocument();

    // Invalid image format
    verifyBadgeFormat.mockResolvedValue(false);

    userEvent.upload(
      uploadButton,
      new File(["(mock image data)"], "mock.png", { type: "image/png" })
    );

    const errorMessage = await screen.findByText(/invalid image format/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders upload progress and opens modal on valid image upload", async () => {
    render(<BadgeUploader />);

    const uploadButton = screen.getByLabelText("Upload Avatar");

    expect(uploadButton).toBeInTheDocument();

    userEvent.upload(
      uploadButton,
      new File(["(mock image data)"], "mock.png", { type: "image/png" })
    );

    await waitFor(() => expect(createAngledGradientBorder).toHaveBeenCalled());

    const modalTitle = screen.getByText(/Congratulations/i);
    expect(modalTitle).toBeInTheDocument();
  });

  it("displays modal with image and closes it on modal close", async () => {
    render(<BadgeUploader />);

    const uploadButton = screen.getByLabelText("Upload Avatar");

    userEvent.upload(
      uploadButton,
      new File(["(mock image data)"], "mock.png", { type: "image/png" })
    );

    await waitFor(() => expect(createAngledGradientBorder).toHaveBeenCalled());

    const modalTitle = screen.getByText(/Congratulations/i);
    expect(modalTitle).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /×/i });
    userEvent.click(closeButton);

    await waitFor(() =>
      expect(screen.queryByText(/Congratulations/i)).not.toBeInTheDocument()
    );
  });
});
