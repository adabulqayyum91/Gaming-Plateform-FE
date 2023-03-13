import * as Yup from "yup";

const CreateUserValidationSchema = Yup.object().shape({
  credits: Yup.string()
    .matches(/^[0-9]{1,4}$/, "Invalid Amount!")
    .max(5, "Too Long!")
    .required(),
});

export { CreateUserValidationSchema };
