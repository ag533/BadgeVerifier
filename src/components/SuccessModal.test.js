import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SuccessModal from "./SuccessModal";

describe("SuccessModal", () => {
  it("renders success modal content", () => {
    const onRequestCloseMock = jest.fn();
    render(<SuccessModal isOpen={true} onRequestClose={onRequestCloseMock} />);

    const successMessage = screen.getByText(
      /Your badge has been successfully added/i
    );
    expect(successMessage).toBeInTheDocument();

    const thankYouMessage = screen.getByText(/Thank you for submitting./i);
    expect(thankYouMessage).toBeInTheDocument();
  });

  it("calls onRequestClose when close button is clicked", () => {
    const onRequestCloseMock = jest.fn();
    render(<SuccessModal isOpen={true} onRequestClose={onRequestCloseMock} />);

    const closeButton = screen.getByRole("button", { name: /×/i });
    userEvent.click(closeButton);

    expect(onRequestCloseMock).toHaveBeenCalledTimes(1);
  });
});
