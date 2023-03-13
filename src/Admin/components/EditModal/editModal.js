import { Modal, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Formik } from "formik";

import Input from "../Input/input";
import FormSubmitButton from "../FormSubmitButton/formSubmitbutton";
import MultiLineField from "../Input/multiLineField";
import CreditsField from "../CreditsField/creditsField";

const MyModal = styled(Modal)({
  "& .MuiBox-root": {
    background: "#1a1a1a",
  },
});

const GeneralModal = ({ open, handleClose, formData, handleEditUser }) => {
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
          initialValues={formData}
          onSubmit={(values) => handleEditUser(values)}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <CreditsField
                  name="credits"
                  required={true}
                  onchange={handleChange}
                  value={values.credits}
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
                  disabled={true}
                  required={false}
                  onchange={handleChange}
                  value={values.userName}
                />
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  disabled={true}
                  required={false}
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
                  title={"Edit User"}
                  clickHandler={handleClose}
                  // onSubmit={}
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
