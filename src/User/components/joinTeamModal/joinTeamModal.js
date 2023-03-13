import { Formik } from "formik";
import React from "react";
import Modal from "../../components/topModal/topModal";
import SelectField from "../../../Admin/components/Input/selectField";
import FormSubmitButton from "../../../Admin/components/FormSubmitButton/formSubmitbutton";
import { allWordsCapitalize } from "../../../utils/apiutils";

export default function joinTeamModal({
  id,
  open,
  name,
  teams,
  handleClose,
  titleImage,
  formFieldName,
  handleJoinTour,
}) {
  const teamsArr = teams?.map((x) => {
    return { _id: x._id, gameName: x.teamViewName };
  });
  return (
    <Modal open={open} handleClose={handleClose} widthe={500}>
      <img
        alt=" "
        src={titleImage}
        height="200px"
        width="100%"
        style={{ borderRadius: "2%", marginTop: "5%", marginBottom: "5%" }}
      />
      <h4 style={{ color: "white" }}>{allWordsCapitalize(name)}</h4>
      <Formik
        initialValues={{
          teamId: "",
          [formFieldName]: id,
        }}
        onSubmit={(values) => handleJoinTour(values)}
      >
        {({ values, handleChange, handleSubmit }) => {
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
              <FormSubmitButton title={"Join"} clickHandler={function () {}} />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
