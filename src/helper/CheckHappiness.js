function isHappyColor(r, g, b) {
  // Calculate perceived brightness of the color
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  // Define a threshold for brightness to determine "happy" colors
  const brightnessThreshold = 150;

  return brightness > brightnessThreshold;
}

export const checkHappiness = (img) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let count = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (!isHappyColor(r, g, b)) {
          count++;
        }
      }

      if (count === 0) {
        if ((count / data) * 100 < 10) {
          resolve(false);
        }
      } else {
        resolve(true);
      }
    };
  });
};
