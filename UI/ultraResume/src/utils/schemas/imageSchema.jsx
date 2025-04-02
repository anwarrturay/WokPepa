import * as yup from "yup";

export const imageSchema = yup.object().shape({
    image: yup
    .mixed()
    .test("fileSize", "Image size must be less than 5MB", (value) => {
      if (!value) return true;
      const file = Array.isArray(value) ? value[0] : value;
      return file.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Only JPG, PNG images are allowed", (value) => {
      if (!value) return true;
      const file = Array.isArray(value) ? value[0] : value;
      return ["image/jpeg", "image/png"].includes(file.type);
    })
});