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
    password: yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
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
