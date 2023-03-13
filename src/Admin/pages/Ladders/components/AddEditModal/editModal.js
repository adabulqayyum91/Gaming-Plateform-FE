import { Modal, Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { Formik } from "formik";

import Input from "../../../../components/Input/input";
import FormSubmitButton from "../../../../components/FormSubmitButton/formSubmitbutton";
import ImageUpload from "../../../../components/ImageUpload/imageUpload";
import DateTimeField from "../../../../components/Input/dateTimeField";
import SelectField from "../../../../components/Input/selectField";
import classes from "./addEditModal.module.scss";

const MyModal = styled(Modal)({
  "& .MuiBox-root": {
    background: "#1a1a1a",
    width: "635px",
    paddingTop: "5%",
  },
  "& MuiGridItem-root": {
    margin: "auto",
  },
});

const GeneralModal = ({
  open,
  handleClose,
  handleEditLadder,
  formDataObj,
  games,
}) => {
  const style = {
    background: "#1a1a1a",
    color: "whitesmoke",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "635px  !important",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    textAlign: "center",
  };
  const ladderTypes = ["open", "premier", "super", "super premier"];
  return (
    <MyModal
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <Formik
          initialValues={formDataObj}
          onSubmit={(values) => {
            let formData = new FormData();
            formData.append("entryFee", values.entryFee);
            if (typeof values.ladderTitleImage !== "string") {
              formData.append("ladderTitleImage", values.ladderTitleImage);
            }
            formData.append("_id", values._id);
            formData.append("prize", values.prize);
            formData.append("startingDateAndTime", values.startingDateAndTime);
            formData.append("endingDateAndTime", values.endingDateAndTime);
            formData.append("totalTeams", values.totalTeams);
            formData.append("teamSize", values.teamSize);
            formData.append("ladderType", values.ladderType);
            formData.append("ladderName", values.ladderName);
            formData.append("gameToPlay", values.gameToPlay);

            return handleEditLadder(formData);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            handleSubmit,
            setFieldTouched,
          }) => {
            return (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Input
                      placeholder="Ladder name"
                      name="ladderName"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.ladderName}
                    />
                    <SelectField
                      placeholder="Game"
                      name="gameToPlay"
                      required={true}
                      onchange={handleChange}
                      value={values.gameToPlay}
                      items={games}
                    />
                    <Input
                      placeholder="Entry Fee"
                      name="entryFee"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.entryFee}
                    />
                    <Input
                      placeholder="Prize"
                      name="prize"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.prize}
                    />
                    <Input
                      placeholder="Team Size"
                      name="teamSize"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.teamSize}
                    />
                    <Input
                      placeholder="Total Teams"
                      name="totalTeams"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.totalTeams}
                    />
                    <SelectField
                      placeholder="Status"
                      name="ladderType"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.ladderType}
                      items={ladderTypes}
                    />
                    <DateTimeField
                      placeholder="Starting Date&Time"
                      name="startingDateAndTime"
                      // required={true}
                      onchange={setFieldValue}
                      value={values.startingDateAndTime}
                    />
                    <DateTimeField
                      placeholder="Ending Date&Time"
                      name="endingDateAndTime"
                      // required={true}
                      onchange={setFieldValue}
                      value={values.endingDateAndTime}
                    />
                  </Grid>
                  <Grid item className={classes.gridItem} xs={12} md={6}>
                    <h5 className={classes.picuploadHeading}>Ladder photo</h5>
                    <ImageUpload
                      name="ladderTitleImage"
                      required={true}
                      onchange={setFieldValue}
                      value={values.ladderTitleImage}
                      setFieldTouched={setFieldTouched}
                      // value={val}
                    />
                  </Grid>
                </Grid>

                <FormSubmitButton
                  title={"Update Ladder"}
                  clickHandler={function () {}}
                />
              </form>
            );
          }}
        </Formik>
      </Box>
    </MyModal>
  );
};
export default GeneralModal;
