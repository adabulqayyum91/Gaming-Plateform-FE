import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import winImg from "../../../../../assets/Mask Group 270.svg";
import lossImg from "../../../../../assets/Mask Group 271.svg";
import { capitalize } from "../../../../../utils/apisauce";
import { tooltipTrim } from "../../../../../utils/apiutils";
import MiniDetail from "../../../../components/miniDetail/miniDetail";
import classes from "./teamTile.module.scss";

export default function TeamTile({ title, img, loss, win }) {
  return (
    <>
      <Box className={classes?.teamRoot}>
        <Grid container>
          <Grid item md={3} pt={1}>
            <img alt=" " src={img} className={classes?.teamsIcon} />
          </Grid>
          <Grid item md={9} pl={0.5}>
            <Typography className={classes?.teamTileTitle}>
              {tooltipTrim(title, 15)}
            </Typography>
            <Box>
              <Grid container className={classes?.teamsIconsImgs}>
                <MiniDetail title="Wins" logo={winImg} value={win} />
                <MiniDetail title="Loss" logo={lossImg} value={loss} />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
