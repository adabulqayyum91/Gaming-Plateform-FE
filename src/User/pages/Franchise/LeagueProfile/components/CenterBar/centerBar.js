import React from "react";
import { Grid, Box } from "@mui/material";

import teamSizeImg from "../../../../../../assets/Group 168(1).svg";
import registeredImg from "../../../../../../assets/Mask Group 8.svg";
import bracketImg from "../../../../../../assets/Mask Group 9.svg";
import MiniDetail from "../../../../../components/miniDetail/miniDetail";
import pricePoolImg from "../../../../../../assets/Group 16.svg";
import classes from "./centerBar.module.scss";

export default function CenterBar({ league }) {
  return (
    <Box className={classes.miniDetailsBar}>
      <Grid container>
        <Grid item md={12 / 5}>
          <MiniDetail
            logo={pricePoolImg}
            title={"Prize Pool"}
            value={league.prize}
          />
        </Grid>
        <Grid item md={12 / 5}>
          <MiniDetail
            logo={teamSizeImg}
            title={"Team Size"}
            value={league.teamSize}
          />
        </Grid>
        <Grid item md={12 / 5}>
          <MiniDetail
            logo={pricePoolImg}
            title={"Entry Fee"}
            value={league.entryFee}
          />
        </Grid>
        <Grid item md={12 / 5}>
          <MiniDetail
            logo={registeredImg}
            title={"Registered"}
            value={league.registered}
          />
        </Grid>
        <Grid item md={12 / 5}>
          <MiniDetail
            logo={bracketImg}
            title={"Total teams"}
            value={league.totalTeams}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
