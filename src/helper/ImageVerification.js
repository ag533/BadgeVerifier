export const imageVerification = (imageSrc) => {
  const img = new Image();
  img.src = imageSrc;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  const circleCenterX = canvas.width / 2;
  const circleCenterY = canvas.height / 2;
  const circleRadius = 256;

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const dist = Math.sqrt(
          Math.pow(x - circleCenterX, 2) + Math.pow(y - circleCenterY, 2)
        );

        if (dist > circleRadius && pixelData[index + 3] > 0) {
          console.log(pixelData[index + 3]);
          return false;
        }
      }
    }

    return true;
  };
};
