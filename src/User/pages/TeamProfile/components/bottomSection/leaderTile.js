import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import winImg from "../../../../../assets/Mask Group 270.svg";
import lossImg from "../../../../../assets/Mask Group 271.svg";
import { tooltipTrim } from "../../../../../utils/apiutils";
import MiniDetail from "../../../../components/miniDetail/miniDetail";
import classes from "./bottomSection.module.scss";

export default function LeaderTile({ title, loss, win, profileImg }) {
  return (
    <>
      <Grid container className={classes.leaderTileRoot}>
        <Grid item md={12} lg={5} textAlign="center">
          <img alt=" " src={profileImg} className={classes.leaderIcon} />
        </Grid>
        <Grid item md={12} lg={7} py={3}>
          <Typography className={classes.leaderTitle}>
            {tooltipTrim(title, 11)}
          </Typography>
          <Box>
            <Grid container className={classes.leaderIconsImgs}>
              <MiniDetail title="Wins" logo={winImg} value={win} />
              <MiniDetail title="Loss" logo={lossImg} value={loss} />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
