export const resizeImage = (img, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = image.width;
      let height = image.height;

      if (width > maxWidth) {
        width = maxWidth;
      }

      if (height > maxHeight) {
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, 0, 0, width, height);

      resolve(canvas.toDataURL());
    };
  });
};
