import { Formik } from "formik";
import React from "react";
import Modal from "../../../components/topModal/topModal";
import Input from "../../../../Admin/components/Input/input";
import FormSubmitButton from "../../../../Admin/components/FormSubmitButton/formSubmitbutton";

export default function nameEdit({
  open,
  handleClose,
  handleUpdateUser,
  fullName,
}) {
  return (
    <Modal open={open} handleClose={handleClose}>
      <Formik
        initialValues={{
          fullName: fullName,
        }}
        onSubmit={(values) => handleUpdateUser(values)}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Full Name"
                name="fullName"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.fullName}
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
