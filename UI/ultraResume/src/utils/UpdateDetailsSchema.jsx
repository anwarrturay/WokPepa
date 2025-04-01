import * as yup from "yup";

export const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    telephone: yup
        .number()
        .positive()
        .integer()
        .required(),
    profession: yup.string().required(),
    image: yup
        .mixed()
        .required("Image is required") 
        .test("fileSize", "Image size must be less than 5MB", (value) =>
            value[0] && value[0].size <= 5 * 1024 * 1024 // 5MB size check
        )
        .test("fileType", "Only JPG, PNG images are allowed", (value) =>
            value[0] && ["image/jpeg", "image/png"].includes(value[0].type)
        )
})
