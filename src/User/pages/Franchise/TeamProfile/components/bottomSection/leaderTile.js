import React from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import edit from "../../../../../../assets/edit.svg";
import winImg from "../../../../../../assets/Mask Group 270.svg";
import lossImg from "../../../../../../assets/Mask Group 271.svg";
import { tooltipTrim } from "../../../../../../utils/apiutils";
import MiniDetail from "../../../../../components/miniDetail/miniDetail";
import classes from "./bottomSection.module.scss";

export default function LeaderTile({
  title,
  loss,
  wins,
  profileImg,
  setLeaderEdit,
}) {
  return (
    <>
      <Grid container className={classes.leaderTileRoot}>
        <Grid item md={12} lg={5} className={classes.leaderIconBox}>
          <img alt=" " src={profileImg} className={classes.leaderIcon} />
        </Grid>
        <Grid
          item
          md={12}
          lg={7}
          pl="5px"
          py={3}
          className={classes.leaderIconText}
        >
          <Typography className={classes.leaderTitle}>
            {title ? tooltipTrim(title, 11) : "Choose leader"}
            <IconButton
              onClick={() => setLeaderEdit(true)}
              sx={{ padding: "0px" }}
            >
              <EditIcon sx={{ color: "#F26826" }} />
            </IconButton>
          </Typography>
          <Box>
            <Grid container className={classes.leaderIconsImgs}>
              <MiniDetail title="Wins" logo={winImg} value={wins ?? 0} />
              <MiniDetail title="Loss" logo={lossImg} value={loss ?? 0} />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
