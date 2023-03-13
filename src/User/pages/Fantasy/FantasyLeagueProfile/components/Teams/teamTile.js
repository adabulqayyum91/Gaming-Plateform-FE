import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import classes from "./subComponents.module.scss";
import { tooltipTrim } from "../../../../../../utils/apiutils";

export default function TeamTile({
  title,
  img,
  owner,
  onClickHandler,
  setShowNameEditModal,
}) {
  return (
    <Grid container className={classes.leaderTileRoot} onClick={onClickHandler}>
      <Grid item md={12} lg={4} className={classes.leaderIconBox}>
        <img alt=" " src={img} className={classes.leaderIcon} />
      </Grid>
      <Grid
        item
        md={12}
        lg={8}
        pl="5px"
        py={3}
        className={classes.leaderIconText}
      >
        <Typography className={classes.leaderTitle}>
          {tooltipTrim(title, 12)}
          {owner && (
            <IconButton onClick={(e) => setShowNameEditModal(e, true)}>
              <EditIcon sx={{ color: "#F26826", pb: "3px" }} />
            </IconButton>
          )}
        </Typography>
      </Grid>
    </Grid>
  );
}
