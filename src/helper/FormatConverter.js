export const formatConverter = (img) => {
  const data = img.split(",")[1];
  return `data:image/png;base64,${data}`;
};
