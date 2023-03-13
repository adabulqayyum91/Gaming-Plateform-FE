import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import winImg from "../../../../../assets/Mask Group 270.svg";
import lossImg from "../../../../../assets/Mask Group 271.svg";
import MiniDetail from "../../../../components/miniDetail/miniDetail";
import removeTeamImg from "../../../../../assets/Group 1534.svg";
import { tooltipTrim } from "../../../../../utils/apiutils";
import classes from "./bottomSection.module.scss";

export default function RosterTeamTile({
  id,
  title,
  img,
  loss,
  win,
  kickoutHanlder,
}) {
  return (
    <>
      <Box className={classes.teamRoot}>
        <Grid container>
          <Grid item md={3} pt={1}>
            <img alt=" " src={img} className={classes.teamsIcon} />
          </Grid>
          <Grid item md={8} pl={0.5}>
            <Typography className={classes.teamTileTitle}>
              {tooltipTrim(title, 11)}
            </Typography>
            <Box>
              <Grid container className={classes.teamIconsImgs}>
                <MiniDetail title="Wins" logo={winImg} value={win} />
                <MiniDetail title="Loss" logo={lossImg} value={loss} />
              </Grid>
            </Box>
          </Grid>
          <Grid item md={1}>
            <img
              style={{ cursor: "pointer" }}
              alt=""
              src={removeTeamImg}
              onClick={() => kickoutHanlder(id)}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
