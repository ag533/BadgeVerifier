export const createCircularBadge = (imgData) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imgData;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const diameter = Math.min(image.width, image.height);
      canvas.width = diameter;
      canvas.height = diameter;

      ctx.beginPath();
      ctx.arc(diameter / 2, diameter / 2, diameter / 2, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(image, 0, 0, diameter, diameter);

      resolve(canvas.toDataURL());
    };
  });
};
