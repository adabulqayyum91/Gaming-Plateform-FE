import { Formik } from "formik";
import React from "react";
import Modal from "../../../../../components/topModal/topModal";
import SelectField from "../../../../../../Admin/components/Input/selectField";
import FormSubmitButton from "../../../../../../Admin/components/FormSubmitButton/formSubmitbutton";
import DateTimeField from "../../../../../../Admin/components/Input/dateTimeField";

export default function TryoutModal({
  open,
  teams,
  handleClose,
  handleSendTryout,
}) {
  const teamsArr = [];
  teams?.map((x) => {
    teamsArr.push({ _id: x._id, gameName: x.teamViewName });
  });
  return (
    <Modal open={open} handleClose={handleClose} widthe={500}>
      <Formik
        initialValues={{
          teamId: "",
          dateAndTime: "",
        }}
        onSubmit={(values) => handleSendTryout(values)}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit}>
              <SelectField
                placeholder="Select Team"
                name="teamId"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.teamId}
                items={teamsArr}
              />
              <DateTimeField
                placeholder="Date&Time"
                name="dateAndTime"
                onchange={setFieldValue}
                value={values.dateAndTime}
              />
              <FormSubmitButton
                title={"Send Tryout"}
                clickHandler={function () {}}
              />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
