import { Modal, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { Formik } from "formik";

import Input from "../../../../components/Input/input";
import FormSubmitButton from "../../../../components/FormSubmitButton/formSubmitbutton";
import ImageUpload from "../../../../components/ImageUpload/imageUpload";
import DateTimeField from "../../../../components/Input/dateTimeField";
import SelectField from "../../../../components/Input/selectField";
import DateField from "../../../../components/Input/dateField";

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

const EditModal = ({
  open,
  handleClose,
  selected,
  handleEditLeague,
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
  const _registeredTeams = formDataObj.registeredTeams;
  delete formDataObj.registeredTeams;
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
          initialValues={formDataObj}
          onSubmit={(values) => {
            let formData = new FormData();
            formData.append("entryFee", values.entryFee);
            formData.append("leagueTitleImage", values.leagueTitleImage);
            formData.append("_id", values._id);
            formData.append("prize", values.prize);
            formData.append("startingDate", values.startingDate);
            formData.append("endingDate", values.endingDate);
            formData.append("totalTeams", values.totalTeams);
            formData.append("teamSize", values.teamSize);
            formData.append("leagueName", values.leagueName);
            formData.append("gameToPlay", values.gameToPlay);

            return handleEditLeague(formData);
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
                      disabled={_registeredTeams > 0 && true}
                    />
                    <SelectField
                      placeholder="Game"
                      name="gameToPlay"
                      required={true}
                      onchange={handleChange}
                      value={values.gameToPlay}
                      items={games}
                      disabled={_registeredTeams > 0 && true}
                    />
                    <Input
                      placeholder="Entry Fee"
                      name="entryFee"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.entryFee}
                      disabled={_registeredTeams > 0 && true}
                    />
                    <Input
                      placeholder="Prize"
                      name="prize"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.prize}
                      disabled={_registeredTeams > 0 && true}
                    />
                    <Input
                      placeholder="Team Size"
                      name="teamSize"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.teamSize}
                      disabled={_registeredTeams > 0 && true}
                    />
                    <SelectField
                      placeholder="Total Teams"
                      name="totalTeams"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.totalTeams}
                      items={totalTeams}
                      disabled={_registeredTeams > 0 && true}
                    />

                    {/* <DateTimeField
                      placeholder="Starting Date&Time"
                      name="startingDateAndTime"
                      // required={true}
                      onchange={setFieldValue}
                      value={values.startingDateAndTime}
                      disabled={_registeredTeams > 0 && true}
                    /> */}
                    <DateField
                      placeholder="Starting Date"
                      name="startingDate"
                      onchange={setFieldValue}
                      value={values.startingDate}
                      disabled={_registeredTeams > 0 && true}
                    />
                    <DateField
                      placeholder="Ending Date"
                      name="endingDate"
                      onchange={setFieldValue}
                      value={values.endingDate}
                      disabled={_registeredTeams > 0 && true}
                    />
                  </Grid>
                  <Grid item sx={{ margin: "auto !important" }} xs={12} md={6}>
                    <h5
                      style={{
                        fontSize: "14px",
                        textAlign: "left",
                        color: "#C7C7C7",
                      }}
                    >
                      Tournamnet photo
                    </h5>
                    <ImageUpload
                      name="leagueTitleImage"
                      required={true}
                      onchange={setFieldValue}
                      value={values.leagueTitleImage}
                      setFieldTouched={setFieldTouched}
                      disabled={_registeredTeams > 0 && true}
                      // value={val}
                    />
                  </Grid>
                </Grid>

                <FormSubmitButton
                  title={"Update League"}
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
export default EditModal;
