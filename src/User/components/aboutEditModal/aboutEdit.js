import { Formik } from "formik";
import React from "react";
import Modal from "../topModal/topModal";
import MultiLineField from "../../../Admin/components/Input/multiLineField";
import FormSubmitButton from "../../../Admin/components/FormSubmitButton/formSubmitbutton";

export default function AboutEdit({
  open,
  handleClose,
  about,
  handleUpdateUser,
}) {
  return (
    <Modal open={open} handleClose={handleClose}>
      <Formik
        initialValues={{
          about: about,
        }}
        onSubmit={(values) => handleUpdateUser(values)}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <MultiLineField
                placeholder="About"
                name="about"
                onchange={handleChange}
                value={values.about}
              />
              <FormSubmitButton
                title={"Update"}
                clickHandler={function () {}}
              />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
