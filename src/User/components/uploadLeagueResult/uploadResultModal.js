import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import Modal from "../topModal/topModal";
import FormSubmitButton from "../../../Admin/components/FormSubmitButton/formSubmitbutton";
import { allWordsCapitalize } from "../../../utils/apiutils";
import Input from "../../../Admin/components/Input/input";
import VideoUpload from "../videoUpload/videoUpload";
import SelectField from "../../../Admin/components/Input/selectField";

export default function UploadLeagueResult({
  id,
  open,
  name,
  titleImage,
  handleClose,
  leagueScheduleData,
  handleUploadResult,
}) {
  const rounds = leagueScheduleData?.data?.map((x) => x?.tournamentRoundText?.toString());
  const matchIds = leagueScheduleData?.data
    ?.map((x) => {
      if (x.matchId != null && x.matchId != undefined && x.matchId?.length > 0) return x.matchId
    }
    )

  const scheduleType = ["round", "playoff", "final"];

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
          score: "",
          // roundNumber: "",
          // scheduleType: "",
          matchId: "",
          videoResult: "",
        }}
        onSubmit={(values) => {
          let formData = new FormData();
          formData.append("leagueId", id);
          formData.append("score", values.score);
          // formData.append("roundNumber", values.roundNumber);
          // formData.append("scheduleType", values.scheduleType);
          formData.append("matchId", values.matchId);
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
              {/* <SelectField
                placeholder="Round No"
                name="roundNumber"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.roundNumber}
                items={rounds ?? []}
              /> */}
              {/* <SelectField
                placeholder="Schedule Type"
                name="scheduleType"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.scheduleType}
                items={scheduleType}
              /> */}
              <SelectField
                placeholder="Match Id"
                name="matchId"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.matchId}
                items={matchIds ?? []}
              />
              <VideoUpload
                name="videoResult"
                required
                title="Upload Video/Image "
                value={values.videoResult}
                onchange={setFieldValue}
              />
              <FormSubmitButton
                title={"Submit"}
                clickHandler={function () { }}
              />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
