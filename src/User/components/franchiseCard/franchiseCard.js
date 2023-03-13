import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import currentMatchImg from "../../../assets/Group 1514.png";
import matchesIcon from "../../../assets/matchesIcon.svg";
import winsIcon from "../../../assets/Group 1539.svg";
import smallTeamsIcon from "../../../assets/smallTeams.png";

import { allWordsCapitalize, tooltipTrim } from "../../../utils/apiutils";
import MiniDetail from "../miniDetail/miniDetail";
import classes from "./franchiseCard.module.scss";

export default function FranchiseCard({
  link,
  img,
  franchiseName,
  franchiseStatus,
  teams,
  owner,
}) {
  return (
    <Box width="280px" height="230px">
      <div className={classes.franchiseCard}>
        <Box className={classes.profile}>
          <Link to={link}>
            <img
              alt=" "
              height="131"
              width="280"
              className={classes.profilePic}
              src={img ? img : currentMatchImg}
            />
            <span className={classes.franchiseName}>
              {tooltipTrim(franchiseName, 15)}
            </span>
          </Link>
        </Box>
        <div className={classes.cardBody}>
          <Grid container>
            <Grid item md={12 / 3}>
              <MiniDetail title="Teams" logo={smallTeamsIcon} value={teams} />
            </Grid>
            <Grid item md={12 / 3}>
              <MiniDetail
                title="Status"
                logo={winsIcon}
                value={allWordsCapitalize(franchiseStatus)}
              />
            </Grid>
            <Grid item md={12 / 3}>
              <span className={classes.owner}>Owner</span>
              <br />
              <span className={classes.ownerName}>
                {tooltipTrim(owner, 15)}
              </span>
            </Grid>
          </Grid>
        </div>
      </div>
    </Box>
  );
}
