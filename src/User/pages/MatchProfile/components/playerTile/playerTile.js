import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import cx from "classnames";

import matchesImg from "../../../../../assets/noun-game-2007259.svg";
import winImg from "../../../../../assets/Group 1539.svg";
import lossImg from "../../../../../assets/Group 1540.svg";
import winpercImg from "../../../../../assets/Group 1541.svg";
import teamProfile from "../../../../../assets/teamprofile.png";
import classes from "./playerTile.module.scss";
import { capitalize } from "../../../../../utils/apisauce";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function PlayerTile({
  resultStatus,
  profileImg,
  userName,
  matches,
  win,
  winPerc,
  loss,
}) {
  const teamImage = profileImg ? BASE_URL + profileImg : teamProfile;
  const dataArray = [
    { icon: matchesImg, title: "Matches", value: matches },
    { icon: winImg, title: "Win", value: win },
    { icon: lossImg, title: "Loss", value: loss },
    {
      icon: winpercImg,
      title: "Win%",
      value: winPerc ?? "--",
    },
  ];
  return (
    <Box className={classes.outer}>
      <Box
        className={cx(
          classes.root,
          resultStatus === "win"
            ? classes.winBorder
            : resultStatus == "loss"
            ? classes.lossBorder
            : ""
        )}
      >
        <Typography className={classes.tileTitle}>
          {!resultStatus ? (
            <Typography fontSize="20px" color="#767676">
              PENDING
            </Typography>
          ) : resultStatus == "win" ? (
            <span>
              <Typography fontSize="20px">
                <img src={winImg} height="25px" />
                WIN
              </Typography>
            </span>
          ) : (
            <span>
              <Typography fontSize="20px">
                <img src={lossImg} height="25px" />
                LOSS
              </Typography>
            </span>
          )}
        </Typography>
        <Typography className={classes.tileTitle}>
          {capitalize(userName)}
        </Typography>
        <Grid item pt={1}>
          <img alt=" " src={teamImage} className={classes.teamIcon} />
        </Grid>
        <Grid item py={4}>
          {dataArray.map((x, i) => (
            <Grid container key={i}>
              <Grid item md={2}></Grid>
              <Grid item md={2}>
                <img alt="" src={x.icon} className={classes.icons} />
              </Grid>
              <Grid item md={4}>
                <span className={classes.content}>{x.title}</span> &nbsp;
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
