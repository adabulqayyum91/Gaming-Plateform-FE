import React from "react";
import { Formik } from "formik";
import Input from "../../../../components/Input/input";
import profileSelfImg from "../../../../../assets/teamprofile.png";
import Modal from "../../../../../User/components/topModal/topModal";
import FormSubmitButton from "../../../../components/FormSubmitButton/formSubmitbutton";
import { Grid, Typography } from "@mui/material";
import classes from "./killPointsModal.module.scss";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function KillPointsModal({
  open,
  row,
  handleClose,
  resultStatus,
  handleUploadResult,
}) {
  //prepare obj for initialValues, having ids and keys and values of that keys
  let formObj = {};
  row?.killPointsArr?.forEach((element) => {
    formObj[element.userId] = element.killPoints;
  });
  return (
    <Modal open={open} handleClose={handleClose} widthe={500}>
      <Formik
        initialValues={row?.killPointsArr ? formObj : { killPoints: null }}
        onSubmit={(values) => {
          let playerPoints = row.teamMembers.map((x) => {
            return {
              userId: x._id,
              killPoints: values[x._id],
            };
          });
          let valuesCpy = {
            playerKillPoints: playerPoints,
            resultId: row._id,
            resultStatus,
          };
          return handleUploadResult(valuesCpy);
        }}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              {row?.teamMembers.map((x, i) => {
                return (
                  <>
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item lg={6} className={classes.userField}>
                        <img
                          src={
                            x.profileImage
                              ? BASE_URL + x.profileImage
                              : profileSelfImg
                          }
                          height="24px"
                          width="24px"
                          alt=""
                        />
                        <Typography
                          variant="span"
                          sx={{ color: "white", ml: 2 }}
                        >
                          {x.userName}
                        </Typography>
                      </Grid>
                      <Grid item lg={2}></Grid>
                      <Grid item lg={4}>
                        <Input
                          placeholder="Kill Points"
                          name={"" + x._id}
                          type="number"
                          required={true}
                          onchange={handleChange}
                          value={values[x._id]}
                        />
                      </Grid>
                    </Grid>
                  </>
                );
              })}
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
