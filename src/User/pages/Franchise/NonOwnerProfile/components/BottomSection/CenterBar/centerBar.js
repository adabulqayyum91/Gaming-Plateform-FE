import React from "react";
import { Grid, Box, Typography, capitalize } from "@mui/material";

import classes from "./centerBar.module.scss";
import hotSaleIcon from "../../../../../../../assets/hot-sale@2x.png";
import largeTeamsIcon from "../../../../../../../assets/largeTeams.png";
import gameImg from "../../../../../../../assets/largeGamminglogo.svg";
import VerticalMiniDetail from "../../../../../../components/verticalMiniDetail/verticalMiniDetail";
import { allWordsCapitalize } from "../../../../../../../utils/apiutils";

export default function CenterBar({
  matches,
  totalTeams,
  franchiseStatus,
  about,
}) {
  const LeftRectangle = () => {
    return (
      <Grid container marginY={"3%"}>
        <Grid item md={8.5}>
          <Grid className={classes.leftRectangle}>
            <Grid container className={classes.cen2terInnerRows}>
              <Grid item md={12 / 3}>
                <VerticalMiniDetail
                  logo={gameImg}
                  title={"Matches"}
                  value={matches}
                  size={30}
                />
              </Grid>
              <Grid item md={12 / 3}>
                <VerticalMiniDetail
                  logo={largeTeamsIcon}
                  title={"Total teams"}
                  value={totalTeams}
                  size={30}
                />
              </Grid>
              <Grid item md={12 / 3}>
                <VerticalMiniDetail
                  logo={hotSaleIcon}
                  title={"Grand Prix status"}
                  size={30}
                  value={allWordsCapitalize(franchiseStatus)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={0.5}></Grid>
        <Grid item md={3} className={classes.rightRectangle}>
          <Typography sx={{ color: "#767676", padding: "2%" }}>
            About&nbsp;
          </Typography>
          <Typography className={classes.franchAboutSec}>
            {about && capitalize(about)}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return <LeftRectangle />;
}
