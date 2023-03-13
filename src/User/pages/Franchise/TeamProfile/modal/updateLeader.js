import { Formik } from "formik";
import React from "react";
import Modal from "../../../../components/topModal/topModal";
import SelectField from "../../../../../Admin/components/Input/selectField";
import FormSubmitButton from "../../../../../Admin/components/FormSubmitButton/formSubmitbutton";

export default function UpdateLeader({
  open,
  roosters,
  handleClose,
  handleUpdateLeader,
}) {
  const roostersArr = [];
  roosters?.map((x) => {
    roostersArr.push({ _id: x._id, gameName: x.fullName });
  });

  return (
    <Modal open={open} handleClose={handleClose} widthe={500}>
      <Formik
        initialValues={{
          teamLeader: "",
        }}
        onSubmit={(values) => handleUpdateLeader(values)}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div style={{ marginTop: "7%" }}></div>
              <SelectField
                placeholder="Select team leader"
                name="teamLeader"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.teamLeader}
                items={roostersArr}
              />
              <FormSubmitButton title={"Add"} clickHandler={function () {}} />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
