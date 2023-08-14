export const isImageOfRightSize = (img) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      if (image.width === 512 && image.height === 512) {
        resolve(true);
      } else {
        resolve(false);
      }
    };
  });
};
