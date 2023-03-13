import React from "react";
import { Formik } from "formik";
import moment from "moment";

import Modal from "../../../../../User/components/topModal/topModal";
import Input from "../../../../components/Input/input";
import FormSubmitButton from "../../../../components/FormSubmitButton/formSubmitbutton";
import SelectInput from "../../../../components/Input/selectField";
import DateTimeField from "../../../../components/Input/dateTimeField";

export default function AddFantasyLeagueModal({
  open,
  leagues,
  handleClose,
  formDataObj,
  handleEditFantasyLeague,
}) {
  const leaguesArr = leagues?.map((x) => ({
    _id: x._id,
    gameName: x.leagueName,
  }));
  const isDatePassed = moment(formDataObj.draftDateAndTime).isBefore(moment());
  const shouldUpdate = formDataObj?.registeredTeams > 0 || isDatePassed;

  delete formDataObj.registeredTeams;
  return (
    <Modal open={open} handleClose={handleClose} widthe={540}>
      <Formik
        initialValues={formDataObj}
        onSubmit={(values) => {
          return handleEditFantasyLeague(values);
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
                disabled={true}
              />
              <Input
                placeholder="Fantasy League Name"
                name="flName"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.flName}
                disabled={shouldUpdate}
              />
              <SelectInput
                placeholder="Total Teams"
                name="totalTeams"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.totalTeams}
                items={totalTeamsArr}
                disabled={shouldUpdate}
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
                disabled={shouldUpdate}
              />
              <DateTimeField
                placeholder="Draft Date & Time"
                name="draftDateAndTime"
                onchange={setFieldValue}
                value={values.draftDateAndTime}
                disabled={shouldUpdate}
              />
              <FormSubmitButton
                title={"Update Fantasy League"}
                clickHandler={function () {}}
              />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
