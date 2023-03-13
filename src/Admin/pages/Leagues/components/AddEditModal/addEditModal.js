import { Formik } from "formik";
import { styled } from "@mui/system";
import { Modal, Box, Grid } from "@mui/material";

import Input from "../../../../components/Input/input";
import FormSubmitButton from "../../../../components/FormSubmitButton/formSubmitbutton";
import ImageUpload from "../../../../components/ImageUpload/imageUpload";
import DateField from "../../../../components/Input/dateField";
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

const LeagueAddModal = ({
  open,
  handleClose,
  handleCreateLeague,
  games,
  formData,
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
  const totalTeams = ["4", "8", "16", "32"];
  return (
    <MyModal
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <Formik
          initialValues={{
            leagueTitleImage: "",
            leagueName: "",
            gameToPlay: "",
            entryFee: "",
            prize: "",
            teamSize: "",
            totalTeams: "",
            startingDate: "",
            endingDate: "",
          }}
          onSubmit={(values) => {
            let formData = new FormData();
            formData.append("entryFee", values.entryFee);
            formData.append("leagueTitleImage", values.leagueTitleImage);
            formData.append("prize", values.prize);
            formData.append("startingDate", values.startingDate);
            formData.append("endingDate", values.endingDate);
            formData.append("totalTeams", values.totalTeams);
            formData.append("teamSize", values.teamSize);
            formData.append("leagueName", values.leagueName);
            formData.append("gameToPlay", values.gameToPlay);
            return handleCreateLeague(formData);
          }}
        >
          {({
            values,
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
                      placeholder="League name"
                      name="leagueName"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.leagueName}
                    />

                    <SelectField
                      placeholder="Game"
                      name="gameToPlay"
                      type="text"
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
                    <SelectField
                      placeholder="Total Teams"
                      name="totalTeams"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.totalTeams}
                      items={totalTeams}
                    />
                    <DateField
                      placeholder="Starting Date"
                      name="startingDate"
                      // required={true}
                      onchange={setFieldValue}
                      value={values.startingDate}
                    />
                    <DateField
                      placeholder="Ending Date"
                      name="endingDate"
                      // required={true}
                      onchange={setFieldValue}
                      value={values.endingDate}
                    />
                  </Grid>
                  <Grid item className={classes.gridItem} xs={12} md={6}>
                    <h5 className={classes.picuploadHeading}>League photo</h5>
                    <ImageUpload
                      name="leagueTitleImage"
                      required={true}
                      onchange={setFieldValue}
                      value={values.leagueTitleImage}
                      setFieldTouched={setFieldTouched}
                      // value={val}
                    />
                  </Grid>
                </Grid>

                <FormSubmitButton
                  title={"Add League"}
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
export default LeagueAddModal;
