import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import winImg from "../../../assets/Mask Group 270.svg";
import lossImg from "../../../assets/Mask Group 271.svg";
import MiniDetail from "../../components/miniDetail/miniDetail";
import removeTeamImg from "../../../assets/Group 1534.svg";
import { tooltipTrim } from "../../../utils/apiutils";
import classes from "./rosterTeamTile.module.scss";
import { Link } from "react-router-dom";

export default function RosterTeamTile({
  id,
  title,
  link,
  img,
  loss,
  win,
  kickoutHanlder,
  isKickoutTrue,
}) {
  const NonClickAble = () => (
    <>
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
    </>
  );
  const ClickAble = () => (
    <>
      <Grid item md={3} pt={1}>
        <Link to={link}>
          <img alt=" " src={img} className={classes.teamsIcon} />
        </Link>
      </Grid>
      <Grid item md={8} pl={0.5}>
        <Link to={link}>
          <Typography className={classes.teamTileTitle}>
            {tooltipTrim(title, 11)}
          </Typography>
          <Box>
            <Grid container className={classes.teamIconsImgs}>
              <MiniDetail title="Wins" logo={winImg} value={win} />
              <MiniDetail title="Loss" logo={lossImg} value={loss} />
            </Grid>
          </Box>
        </Link>
      </Grid>
    </>
  );
  return (
    <>
      <Box className={classes.teamRoot}>
        <Grid container>
          {link ? <ClickAble /> : <NonClickAble />}
          {isKickoutTrue && (
            <Grid item md={1}>
              <img
                style={{ cursor: "pointer" }}
                alt=""
                src={removeTeamImg}
                onClick={() => kickoutHanlder(id)}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}
