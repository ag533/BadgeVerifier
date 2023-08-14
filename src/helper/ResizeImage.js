export const resizeImage = (img, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = maxWidth;
      canvas.height = maxHeight;
      const ctx = canvas.getContext("2d");

      // Draw the image onto the canvas with the new dimensions
      ctx.drawImage(image, 0, 0, maxWidth, maxHeight);

      resolve(canvas.toDataURL());
    };
  });
};
