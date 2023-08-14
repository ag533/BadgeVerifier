export const isImageInPNGFormat = async (img) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const type = img.split(";")[0].split("/")[1];
  const allowedExtensions = /(png)$/i;
  if (!allowedExtensions.test(type)) {
    return false;
  }
  return true;
};
