import { Modal, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { Formik } from "formik";

import Input from "../../../../components/Input/input";
import FormSubmitButton from "../../../../components/FormSubmitButton/formSubmitbutton";
import ImageUpload from "../../../../components/ImageUpload/imageUpload";
import SelectMultiField from "../../../../components/Input/selectMultiField";
import SelectField from "../../../../components/Input/selectField";

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

const GeneralModal = ({ open, handleClose, handleEditGame, formDataObj }) => {
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
  const PLATFORMS = ["XBOX", "PLAYSTATION", "PC", "ANDROID", "IOS"];
  const GAMETYPE = ["user", "franchise"];
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
            formData.append("_id", values._id);
            formData.append("gameImage", values.gameImage);
            formData.append("gameName", values.gameName);
            formData.append("gameType", values.gameType);
            formData.append("platforms", JSON.stringify(values.platforms));

            return handleEditGame(formData);
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
                      placeholder="Game name"
                      name="gameName"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.gameName}
                    />
                    <SelectMultiField
                      placeholder="Platforms *"
                      name="platforms"
                      type="text"
                      required={true}
                      onchange={setFieldValue}
                      value={values.platforms}
                      items={PLATFORMS}
                    />

                    <SelectField
                      placeholder="Game For "
                      name="gameType"
                      type="text"
                      required={true}
                      onchange={handleChange}
                      value={values.gameType}
                      items={GAMETYPE}
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
                      Game photo
                    </h5>
                    <ImageUpload
                      name="gameImage"
                      required={true}
                      onchange={setFieldValue}
                      value={values.gameImage}
                      setFieldTouched={setFieldTouched}
                    // value={val}
                    />
                  </Grid>
                </Grid>

                <FormSubmitButton
                  title={"Update Game"}
                  clickHandler={function () { }}
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
