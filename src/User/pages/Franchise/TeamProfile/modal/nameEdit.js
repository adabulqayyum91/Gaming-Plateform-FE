import { Formik } from "formik";
import React from "react";
import Modal from "../../../../components/topModal/topModal";
import Input from "../../../../../Admin/components/Input/input";
import FormSubmitButton from "../../../../../Admin/components/FormSubmitButton/formSubmitbutton";

export default function nameEdit({
  open,
  handleClose,
  handleUpdateUser,
  teamViewName,
}) {
  return (
    <Modal open={open} handleClose={handleClose}>
      <Formik
        initialValues={{
          teamViewName: teamViewName,
        }}
        onSubmit={(values) => handleUpdateUser(values)}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Team View Name"
                name="teamViewName"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.teamViewName}
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
