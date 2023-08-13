export const formatConverter = (img) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = image.width;
      let height = image.height;

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0, width, height);

      resolve(canvas.toDataURL("image/png"));
    };
  });
};
