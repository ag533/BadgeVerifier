import { verifyBadgeFormat } from "./VerifyBadgeFormat";

describe("verifyBadgeFormat", () => {
  it("should return true for a valid image format", async () => {
    const validImage = "data:image/png;base64,xyz..."; // Provide a valid image data
    const result = await verifyBadgeFormat(validImage);
    expect(result).toBe(true);
  });

  it("should return false for an invalid image format", async () => {
    const invalidImage = "data:text/plain;base64,xyz..."; // Provide an invalid image data
    const result = await verifyBadgeFormat(invalidImage);
    expect(result).toBe(false);
  });
});
