import { Modal, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Formik } from "formik";

import Input from "../Input/input";
import CreditsField from "../CreditsField/creditsField";
import FormSubmitButton from "../FormSubmitButton/formSubmitbutton";
import MultiLineField from "../Input/multiLineField";
import { CreateUserValidationSchema } from "../../../utils/formValidations";

const MyModal = styled(Modal)({
  "& .MuiBox-root": {
    background: "#1a1a1a",
  },
});

const GeneralModal = ({ open, handleClose, handleCreateUser }) => {
  const style = {
    background: "#1a1a1a",
    color: "whitesmoke",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "450px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    textAlign: "center",
  };
  return (
    <MyModal
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <Formik
          initialValues={{
            credits: 50,
            fullName: "",
            password: "",
            userName: "",
            email: "",
            about: "",
          }}
          validationSchema={CreateUserValidationSchema}
          onSubmit={(values) => {
            return handleCreateUser(values);
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            onchange,
            errors,
            touched,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <CreditsField
                  name="credits"
                  required={true}
                  onchange={handleChange}
                  value={values.credits}
                  errors={errors}
                  touched={touched}
                />
                <Input
                  placeholder="Full name"
                  name="fullName"
                  type="text"
                  required={true}
                  onchange={handleChange}
                  value={values.fullName}
                />
                <Input
                  placeholder="User name"
                  name="userName"
                  type="text"
                  required={true}
                  onchange={handleChange}
                  value={values.userName}
                />
                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  required={true}
                  onchange={handleChange}
                  value={values.password}
                />
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  required={true}
                  onchange={handleChange}
                  value={values.email}
                />
                <MultiLineField
                  placeholder="About"
                  name="about"
                  onchange={handleChange}
                  value={values.about}
                />
                <FormSubmitButton
                  title={"Add User"}
                  clickHandler={function () {}}
                />
              </form>
            );
          }}
        </Formik>
      </Box>
    </MyModal>
  );
};
export default GeneralModal;
