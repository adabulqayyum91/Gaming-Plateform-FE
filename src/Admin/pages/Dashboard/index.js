import * as React from "react";
import { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";

import { getStats } from "./reducers";
import classes from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getStats());
  }, []);

  return (
    <Grid container className={classes.dashContainer} columnSpacing={5}>
      <Grid item>
        <Box className={classes.infoBox}>{stats?.totalUsers}</Box>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#FF7700",
            mt: 2,
            mb: 2,
            textAlign: "center",
          }}
        >
          Total Users
        </Typography>
      </Grid>
      <Grid item>
        <Box className={classes.infoBox}>{stats?.loggedinUsers}</Box>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#FF7700",
            mt: 2,
            mb: 2,
            textAlign: "center",
          }}
        >
          Logged in Users
        </Typography>
      </Grid>
      <Grid item>
        <Box className={classes.infoBox}>{stats?.totalGames}</Box>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#FF7700",
            mt: 2,
            mb: 2,
            textAlign: "center",
          }}
        >
          Total Games
        </Typography>
      </Grid>
    </Grid>
  );
}
