import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the logo", () => {
    render(<App />);
    const logoElement = screen.getByAltText("logo");
    expect(logoElement).toBeInTheDocument();
  });

  it("renders the badge creator header", () => {
    render(<App />);
    const headerElement = screen.getByText("Badge Verifier");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the footer", () => {
    render(<App />);
    const footerElement = screen.getByText("Created by");
    expect(footerElement).toBeInTheDocument();
  });
});
