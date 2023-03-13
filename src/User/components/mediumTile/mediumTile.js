import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import teamProfile from "../../../assets/teamprofile.png";
import classes from "./mediumTile.module.scss";
import { allWordsCapitalize } from "../../../utils/apiutils";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function MediumTile({
  teamName,
  roosters,
  teamLeader,
  teamImg,
}) {
  const teamImage = teamImg ? BASE_URL + teamImg : teamProfile;
  return (
    <>
      <Box className={classes.root}>
        <Grid container>
          <Grid item md={9}>
            <Typography className={classes.tileTitle}>
              {allWordsCapitalize(teamName)}
            </Typography>
            <div>
              <Typography>
                <span className={classes.content}>Rosters</span> &nbsp;{" "}
                <span className={classes.value}>{roosters}</span>
              </Typography>
              <Typography>
                <span className={classes.content}>Leader</span> &nbsp;{" "}
                <span className={classes.value}>{teamLeader}</span>
              </Typography>
            </div>
          </Grid>
          <Grid item md={3} pt={1}>
            <img alt=" " src={teamImage} className={classes.teamIcon} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
