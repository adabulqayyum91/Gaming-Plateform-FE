import { Formik } from "formik";
import React, { useState } from "react";
import coin from "../../../../assets/Group 1594.svg";
import Modal from "../../../components/topModal/topModal";
import MatchImageUpload from "./matchImageUpload";
import Input from "../../../../Admin/components/Input/input";
import MultiLineField from "../../../../Admin/components/Input/multiLineField";
import FormSubmitButton from "../../../../Admin/components/FormSubmitButton/formSubmitbutton";
import SelectInput from "../../../../Admin/components/Input/selectField";
import DateTimeField from "../../../../Admin/components/Input/dateTimeField";
import RadioField from "../../../../Admin/components/Input/radioField";
import { Grid, Typography } from "@mui/material";

export default function AddMatchModal({
  open,
  handleClose,
  handleCreateMatch,
  games,
  friends,
}) {

  const [rules, setRules] = useState("Sample Rules")

  const Types = ["All", "Xbox", "PlayStation", "PC", "Mobile"];
  const rulesType = ["Sample Rules", "Custom"];
  const friends_ = friends?.map((x) => ({ _id: x._id, gameName: x.fullName }));
  return (
    <Modal open={open} handleClose={handleClose} widthe={540}>
      <Formik
        initialValues={{
          matchTitleImage: "",
          matchName: "",
          gameToPlay: "",
          platform: "",
          prize: "",
          matchType: "private",
          challengeTo: "",
          startingDateAndTime: "",
          rules: "-"
        }}
        onSubmit={(values) => {
          let formData = new FormData();
          formData.append("matchTitleImage", values.matchTitleImage);
          formData.append("matchName", values.matchName);
          formData.append("gameToPlay", values.gameToPlay);
          formData.append("platform", values.platform);
          formData.append("prize", values.prize);
          formData.append("matchRules", values.rules);
          formData.append(
            "challengeTo",
            values.matchType == "private" ? values.challengeTo : ""
          );
          formData.append("startingDateAndTime", values.startingDateAndTime);
          return handleCreateMatch(formData);
        }}
      >
        {({ values, handleChange, setFieldValue, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <MatchImageUpload
                name="matchTitleImage"
                value={values.matchTitleImage}
                onchange={setFieldValue}
              />
              <Input
                placeholder="Match Name"
                name="matchName"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.matchName}
              />
              <SelectInput
                placeholder="Game"
                name="gameToPlay"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.gameToPlay}
                items={games}
              />
              <Grid container>
                <Grid item md={5.8}>
                  <SelectInput
                    placeholder="Platform"
                    name="platform"
                    type="text"
                    required={true}
                    onchange={handleChange}
                    value={values.platform}
                    items={Types}
                  />
                </Grid>
                <Grid item md={0.4}></Grid>
                <Grid item md={5.8}>
                  <Input
                    placeholder="$Prize"
                    name="prize"
                    type="text"
                    required={true}
                    onchange={handleChange}
                    value={values.prize}
                    icon={
                      null
                    }
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={5.8}>
                  <Typography sx={{ color: "#767676", pt: 2.5 }}>
                    Select Match Type
                  </Typography>
                </Grid>
                <Grid item md={0.4}></Grid>
                <Grid item md={5.8} pt={"9px"}>
                  <RadioField
                    placeholder="Select Friend To Challenge"
                    name="matchType"
                    required={true}
                    onchange={setFieldValue}
                    value={values.matchType}
                    options={["private", "public"]}
                  />
                </Grid>
              </Grid>

              {values.matchType == "private" && (
                <SelectInput
                  placeholder="Select Friend To Challenge"
                  name="challengeTo"
                  type="text"
                  required={true}
                  onchange={handleChange}
                  value={values.challengeTo}
                  items={friends_}
                />
              )}
              <SelectInput
                placeholder="Rules"
                name="rolesOptions"
                type="text"
                required={true}
                onchange={(e) => setRules(e.target.value)}
                value={rules}
                items={rulesType}
              />
              {rules == "Custom" ? <MultiLineField
                placeholder="Rules"
                name="rules"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.rules}
                rows={5}
              /> : <></>}
              <DateTimeField
                placeholder="Starting Date&Time"
                name="startingDateAndTime"
                // required={true}
                onchange={setFieldValue}
                value={values.startingDateAndTime}
              />
              {values.matchType !== "private" && (
                <Typography
                  component="span"
                  sx={{ color: "white", fontSize: 16 }}
                >
                  Note: Match will go under your choosen game profile section
                </Typography>
              )}
              <FormSubmitButton
                title={
                  values.matchType == "private" ? "Send Invite" : "Create Match"
                }
                clickHandler={function () { }}
              />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
