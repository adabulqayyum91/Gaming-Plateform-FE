import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import teamProfile from "../../../assets/teamprofile.png";
import classes from "./newsTile.module.scss";
import { capitalize } from "../../../utils/apisauce";

export default function NewsTile({ text, datetime }) {
  return (
    <>
      <Box className={classes.root}>
        <Typography className={classes.tileTitle}>
          {/* {capitalize(text)} */}
          Coming Soon
        </Typography>
      </Box>
    </>
  );
}
