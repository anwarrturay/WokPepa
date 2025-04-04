import * as yup from "yup";

export const reportSchema = yup.object().shape({
    reportType: yup.string().required(),
    description: yup.string().required(),
})