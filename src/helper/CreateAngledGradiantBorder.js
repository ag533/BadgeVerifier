export const createAngledGradientBorder = (imgUrl, gradientColors, angle) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imgUrl;
    image.onload = () => {
      const diameter =
        Math.min(image.width, image.height) > 512
          ? 472
          : Math.min(image.width, image.height);
      const borderWidth = (diameter * 8) / 100; // Width of the border
      const gradientSteps = gradientColors.length;

      const canvas = document.createElement("canvas");
      canvas.width = diameter + borderWidth;
      canvas.height = diameter + borderWidth;

      const ctx = canvas.getContext("2d");

      // Calculate center position
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw the circular border with the gradient
      ctx.beginPath();
      ctx.arc(centerX, centerY, diameter / 2, 0, 2 * Math.PI);
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = gradientColors[0]; // Set initial color for border
      ctx.stroke();

      // Calculate gradient line endpoints
      const startX = centerX + (diameter / 2) * Math.cos(angle);
      const startY = centerY + (diameter / 2) * Math.sin(angle);
      const endX = centerX - (diameter / 2) * Math.cos(angle);
      const endY = centerY - (diameter / 2) * Math.sin(angle);

      // Create an angled gradient for the border
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      gradientColors.forEach((color, index) => {
        gradient.addColorStop(index / (gradientSteps - 1), color);
      });

      // Draw the circular border with the gradient
      ctx.beginPath();
      ctx.arc(centerX, centerY, diameter / 2, 0, 2 * Math.PI);
      ctx.strokeStyle = gradient;
      ctx.stroke();

      // Draw the circular image
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, diameter / 2, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(
        image,
        centerX - diameter / 2,
        centerY - diameter / 2,
        diameter,
        diameter
      );
      ctx.restore();

      resolve(canvas.toDataURL());
    };
  });
};
