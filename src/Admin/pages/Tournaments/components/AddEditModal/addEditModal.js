import { Modal, Box, Grid } from "@mui/material";
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

const AddEditModal = ({ open, handleClose, handleCreateTournament, games }) => {
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

  const userGames = games.filter((x) => x.gameType === "user");
  const gpGames = games.filter((x) => x.gameType === "franchise");

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
            tournamentTitleImage: "",
            tournamentName: "",
            gameToPlay: "",
            entryFee: "",
            prize: "",
            tournamentType: "",
            teamSize: "",
            totalTeams: "",
            startingDateAndTime: "",
          }}
          onSubmit={(values) => {
            let _tournamentType =
              values.tournamentType === "Grand Prix" ? "franchise" : "general";

            let formData = new FormData();
            formData.append("entryFee", values.entryFee);
            formData.append(
              "tournamentTitleImage",
              values.tournamentTitleImage
            );
            formData.append("prize", values.prize);
            formData.append("tournamentType", _tournamentType);
            formData.append("startingDateAndTime", values.startingDateAndTime);
            formData.append("totalTeams", values.totalTeams);
            formData.append("teamSize", values.teamSize);
            formData.append("tournamentName", values.tournamentName);
            formData.append("gameToPlay", values.gameToPlay);
            return handleCreateTournament(formData);
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
                      placeholder="Tournament name"
                      name="tournamentName"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.tournamentName}
                    />

                    <SelectField
                      placeholder="Tournament Type"
                      name="tournamentType"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.tournamentType}
                      items={["General", "Grand Prix"]}
                    />
                    <SelectField
                      placeholder="Game"
                      name="gameToPlay"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.gameToPlay}
                      items={
                        values.tournamentType === "Grand Prix"
                          ? gpGames
                          : userGames
                      }
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
                      type="number"
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

                    <DateTimeField
                      placeholder="Starting Date&Time"
                      name="startingDateAndTime"
                      // required={true}
                      onchange={setFieldValue}
                      value={values.startingDateAndTime}
                    />
                  </Grid>
                  <Grid item className={classes.gridItem} xs={12} md={6}>
                    <h5 className={classes.picuploadHeading}>
                      Tournament photo
                    </h5>
                    <ImageUpload
                      name="tournamentTitleImage"
                      required={true}
                      onchange={setFieldValue}
                      value={values.tournamentTitleImage}
                      setFieldTouched={setFieldTouched}
                      // value={val}
                    />
                  </Grid>
                </Grid>

                <FormSubmitButton
                  title={"Add Tournament"}
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
export default AddEditModal;
