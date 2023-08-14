import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageModal from "./ImageModal";

describe("ImageModal", () => {
  const mockImage = "mockImageUrl";

  it("displays download and submit buttons", () => {
    const onRequestCloseMock = jest.fn();
    const { container } = render(
      <ImageModal
        isOpen={true}
        onRequestClose={onRequestCloseMock}
        image={mockImage}
        isImagePNG={true}
        isImagePNGOfCorrectSize={true}
        isImagePNGVisiblePixelsInsideCircle={true}
        isImagePNGBorderHappy={true}
      />
    );

    const downloadButton = screen.getByText("Download");
    const submitButton = screen.getByText("Submit");

    expect(downloadButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    userEvent.click(submitButton);
    expect(onRequestCloseMock).toHaveBeenCalledTimes(1);
  });

  it("opens SuccessModal on submit button click", () => {
    const onRequestCloseMock = jest.fn();
    render(
      <ImageModal
        isOpen={true}
        onRequestClose={onRequestCloseMock}
        image={mockImage}
        isImagePNG={true}
        isImagePNGOfCorrectSize={true}
        isImagePNGVisiblePixelsInsideCircle={true}
        isImagePNGBorderHappy={true}
      />
    );

    const submitButton = screen.getByText("Submit");
    userEvent.click(submitButton);

    const successModal = screen.getByText("Thank you for submitting.");
    expect(successModal).toBeInTheDocument();
  });

  it("closes modal on close button click", () => {
    const onRequestCloseMock = jest.fn();
    render(
      <ImageModal
        isOpen={true}
        onRequestClose={onRequestCloseMock}
        image={mockImage}
        isImagePNG={true}
        isImagePNGOfCorrectSize={true}
        isImagePNGVisiblePixelsInsideCircle={true}
        isImagePNGBorderHappy={true}
      />
    );

    const closeButton = screen.getByRole("button", { name: /×/i });
    userEvent.click(closeButton);

    expect(onRequestCloseMock).toHaveBeenCalledTimes(1);
  });
});
