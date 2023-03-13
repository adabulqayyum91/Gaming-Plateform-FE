import React from "react";
import { Formik } from "formik";
import Modal from "../../../../components/topModal/topModal";
import Input from "../../../../../Admin/components/Input/input";
import FormSubmitButton from "../../../../../Admin/components/FormSubmitButton/formSubmitbutton";
import SelectInput from "../../../../../Admin/components/Input/selectField";
import DateTimeField from "../../../../../Admin/components/Input/dateTimeField";

export default function AddFantasyLeagueModal({
  open,
  leagues,
  friends,
  handleClose,
  handleCreateFantasyLeague,
}) {
  const leaguesArr = leagues?.map((x) => ({
    _id: x._id,
    gameName: x.leagueName,
  }));
  return (
    <Modal open={open} handleClose={handleClose} widthe={540}>
      <Formik
        initialValues={{
          leagueId: "",
          flName: "",
          totalTeams: "",
          teamSize: "",
          draftDateAndTime: "",
        }}
        onSubmit={(values) => {
          return handleCreateFantasyLeague(values);
        }}
      >
        {({ values, handleChange, setFieldValue, handleSubmit }) => {
          let league = leagues?.filter((x) => x._id === values.leagueId);
          let totalTeamsArr = [];
          let totTeams = league[0]?.totalTeams;
          let teamSize = league[0]?.teamSize;
          let temp = totTeams;
          for (; temp >= 4; temp) {
            totalTeamsArr.push("" + temp);
            temp = parseInt(temp) / 2;
          }
          let teamSizeRange = (totTeams * teamSize) / totTeams;

          return (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <SelectInput
                placeholder="Grand Prix League"
                name="leagueId"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.leagueId}
                items={leaguesArr}
              />
              <Input
                placeholder="Fantasy League Name"
                name="flName"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.flName}
              />
              <SelectInput
                placeholder="Total Teams"
                name="totalTeams"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.totalTeams}
                items={totalTeamsArr}
              />
              <Input
                placeholder={
                  teamSizeRange
                    ? "Team Size Range: ( 1 to " + teamSizeRange + " )"
                    : "Team Size"
                }
                name="teamSize"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.teamSize}
              />
              <DateTimeField
                placeholder="Draft Date & Time"
                name="draftDateAndTime"
                onchange={setFieldValue}
                value={values.draftDateAndTime}
              />
              <FormSubmitButton
                title={"Create Fantasy League"}
                clickHandler={function () {}}
              />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
