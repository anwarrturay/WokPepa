import * as yup from "yup";

export const updateSchema = yup.object().shape({
    firstname: yup.string().required("Firstname is required"),
    lastname: yup.string().required("Lastname is required"),
    telephone: yup
        .number()
        .positive()
        .integer()
        .required(),
    profession: yup.string().required("Profession is required"),
});
