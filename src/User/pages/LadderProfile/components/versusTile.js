import React from "react";
import { Grid, Box, Typography } from "@mui/material";

import { tooltipTrim } from "../../../../utils/apiutils";
import profileImg from "../../../../assets/teamprofile.png";
import classes from "../ladderProfile.module.scss";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function VersusTile({
  id,
  firstName,
  secondName,
  isMatchPrticipent,
  firstImg,
  secondImg,
  resultSubmit,
  setWarLaderResultModal,
}) {
  return (
    <Box className={classes.tileContainer}>
      <Grid
        container
        pb={3}
        justifyContent="space-around"
        alignItems="center"
        className={classes.upperSection}
      >
        <Grid item>
          <img
            alt=" "
            src={firstImg ? BASE_URL + firstImg : profileImg}
            className={classes.roundedImg}
          />
        </Grid>
        <Grid item sx={{ color: "#f26826", fontSize: "24" }}>
          VS
        </Grid>
        <Grid item>
          <img
            alt=" "
            src={secondImg ? BASE_URL + secondImg : profileImg}
            className={classes.roundedImg}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="space-around" py={2}>
        <Typography component="span" sx={{ color: "white" }}>
          {tooltipTrim(firstName, 7)}
        </Typography>
        <Typography
          component="span"
          sx={{ color: "#f26826", fontWeight: "bold" }}
        >
          /
        </Typography>
        <Typography component="span" sx={{ color: "white" }}>
          {tooltipTrim(secondName, 7)}
        </Typography>
      </Grid>
      {!resultSubmit && isMatchPrticipent ? (
        <Typography
          component="span"
          onClick={(e) => setWarLaderResultModal(true)}
          sx={{
            color: "#f26826",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add Result
        </Typography>
      ) : (
        <Typography
          component="span"
          sx={{
            color: "#f26826",
            fontWeight: "bold",
          }}
        >
          {isMatchPrticipent ? "Result Submitted" : "X"}
        </Typography>
      )}
    </Box>
  );
}
