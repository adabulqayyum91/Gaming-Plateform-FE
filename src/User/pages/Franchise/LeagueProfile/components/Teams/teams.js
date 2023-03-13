import React from "react";

import { Grid } from "@mui/material";

import classes from "./teams.module.scss";
import MediumTile from "../../../../../components/mediumTile/mediumTile";
import GeneralText from "../../../../../components/generalText/generalText";

export default ({ league }) => {
  return (
    <>
      {league && league?.participatingTeams?.length >= 1 ? (
        <Grid container className={classes.bottomBar}>
          <Grid item md={12}>
            <Grid container>
              {league?.participatingTeams?.map((x, i) => (
                <Grid item key={i} md={12 / 2} lg={12 / 3} xl={12 / 4}>
                  <MediumTile
                    key={i}
                    roosters={x.rooster}
                    teamName={x.teamViewName}
                    teamLeader={x.leader}
                    teamImg={x.teamTitleImage}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <GeneralText text="No Teams Found!" />
      )}
    </>
  );
};
