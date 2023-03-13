import { Formik } from "formik";
import React from "react";
import Modal from "../../components/topModal/topModal";
import FormSubmitButton from "../../../Admin/components/FormSubmitButton/formSubmitbutton";
import { allWordsCapitalize } from "../../../utils/apiutils";
import Input from "../../../Admin/components/Input/input";
import VideoUpload from "../videoUpload/videoUpload";

export default function uploadResultModal({
  id,
  open,
  name,
  teamId,
  handleClose,
  titleImage,
  formFieldName,
  handleUploadResult,
}) {
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
          teamId: teamId,
          [formFieldName]: id,
          score: "",
          videoResult: "",
        }}
        onSubmit={(values) => {
          let formData = new FormData();
          teamId && formData.append("teamId", teamId);
          formData.append([formFieldName], values[formFieldName]);
          formData.append("score", values.score);
          formData.append("videoResult", values.videoResult);
          return handleUploadResult(formData);
        }}
      >
        {({ values, handleChange, setFieldValue, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Input
                placeholder="Score"
                name="score"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.score}
              />
              <VideoUpload
                name="videoResult"
                required
                title="Video/Image Upload"
                value={values.videoResult}
                onchange={setFieldValue}
              />
              <FormSubmitButton
                title={"Submit"}
                clickHandler={function () {}}
              />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
