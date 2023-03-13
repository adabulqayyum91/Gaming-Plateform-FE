import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import matchesImg from "../../../assets/noun-game-2007259.svg";
import winImg from "../../../assets/Group 1539.svg";
import lossImg from "../../../assets/Group 1540.svg";
import winpercImg from "../../../assets/Group 1541.svg";
import teamProfile from "../../../assets/teamprofile.png";
import classes from "./winningTeamTile.module.scss";
import { allWordsCapitalize } from "../../../utils/apiutils";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function WinningTeamTile({
  teamImg,
  teamName,
  matches,
  win,
  winPerc,
  loss,
}) {
  const teamImage = teamImg ? BASE_URL + teamImg : teamProfile;
  const dataArray = [
    { icon: matchesImg, title: "Matches", value: matches },
    { icon: winImg, title: "Win", value: win },
    { icon: lossImg, title: "Loss", value: loss },
    { icon: winpercImg, title: "Win%", value: winPerc },
  ];
  return (
    <Box className={classes.outer}>
      <Typography className={classes.tileTitle}>Winning Team</Typography>
      <Box className={classes.root}>
        <Grid item pt={1}>
          <img alt=" " src={teamImage} className={classes.teamIcon} />
        </Grid>
        <Grid item>
          <Typography className={classes.tileTitle}>
            {allWordsCapitalize(teamName)}
          </Typography>
          {dataArray.map((x, i) => (
            <Grid container key={i}>
              <Grid item md={2}></Grid>
              <Grid item md={2}>
                <img alt="" src={x.icon} className={classes.icons} />
              </Grid>
              <Grid item md={4}>
                {" "}
                <span className={classes.content}>{x.title}</span> &nbsp;{" "}
              </Grid>
              <Grid item md={2}>
                <span className={classes.value}>{x.value}</span>
              </Grid>
              <Grid item md={2}></Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
