import React from "react";
import { Formik } from "formik";
import Modal from "../../components/topModal/topModal";
import ImageUpload from "../../components/ImageUploadCircular/ImageUploadCircular";
import Input from "../../../Admin/components/Input/input";
import FormSubmitButton from "../../../Admin/components/FormSubmitButton/formSubmitbutton";

export default function AddTeamModal({ open, handleClose, handleCreateTeam }) {
  return (
    <Modal open={open} handleClose={handleClose} widthe={440}>
      <Formik
        initialValues={{
          teamViewName: "",
          teamNickName: "",
          teamTitleImage: "",
        }}
        onSubmit={(values) => {
          let formData = new FormData();
          formData.append("teamViewName", values.teamViewName);
          formData.append("teamNickName", values.teamNickName);
          formData.append("teamTitleImage", values.teamTitleImage);
          return handleCreateTeam(formData);
        }}
      >
        {({ values, handleChange, setFieldValue, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <ImageUpload
                name="teamTitleImage"
                value={values.teamTitleImage}
                onchange={setFieldValue}
              />
              <Input
                placeholder="Team Name"
                name="teamViewName"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.teamViewName}
              />
              <Input
                placeholder="Team Nick Name"
                name="teamNickName"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.teamNickName}
              />

              <FormSubmitButton title={"Add"} clickHandler={function () {}} />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
