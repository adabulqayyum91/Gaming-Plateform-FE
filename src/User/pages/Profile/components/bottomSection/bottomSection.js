import React from "react";
import { Grid, Box, Typography } from "@mui/material";

import edit from "../../../../../assets/edit.svg";
import classes from "./bottomSection.module.scss";
import MatchCard from "../../../../components/matchCard/matchCard";
import DummyCard from "../../../../components/dummyCard/dummyCard";
import { tooltipTrim } from "../../../../../utils/apiutils";
import { capitalize } from "../../../../../utils/apisauce";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function BottomSection({ profile, setAboutEdit }) {
  const { currentMatch } = profile;
  const {
    userDetail: { matches, wins, losses, winPercentage, recentResults },
  } = profile;

  return (
    <Grid container marginY={"3%"}>
      <Grid item md={8.5}>
        <Typography sx={{ color: "#767676" }}>Overview&nbsp;</Typography>
        <Box className={classes.leftRectangle}>
          <Grid container>
            <Grid item md={12} lg={6}>
              <Typography sx={{ color: "#767676", textAlign: "left" }}>
                Current Match
              </Typography>
              {currentMatch?._id ? (
                <MatchCard
                  link={"/user/my-matches/" + currentMatch._id}
                  img={
                    currentMatch.matchTitleImage
                      ? BASE_URL + currentMatch.matchTitleImage
                      : null
                  }
                  name={currentMatch.matchName}
                  challengeBy={currentMatch?.challengeBy}
                  challengeTo={currentMatch?.challengeTo}
                  prize={currentMatch.prize}
                  date={currentMatch.startDate}
                  time={currentMatch.startTime}
                  status={currentMatch.status}
                />
              ) : (
                <DummyCard text="No Match Found!" />
              )}
            </Grid>
            <Grid item md={12} lg={6}>
              <Grid container className={classes.stats}>
                <Grid item className={classes.stateItem}>
                  <p className={classes.statsHead}>Matches</p>
                  <p>{matches}</p>
                </Grid>
                <Grid item className={classes.stateItem}>
                  <p className={classes.statsHead}>Wins</p>
                  <p>{wins}</p>
                </Grid>
                <Grid item className={classes.stateItem}>
                  <p className={classes.statsHead}>Losses</p>
                  <p>{losses}</p>
                </Grid>
                <Grid item className={classes.stateItem}>
                  <p className={classes.statsHead}>Win%</p>
                  <p>{winPercentage}</p>
                </Grid>
                <Grid item className={classes.stateItem}>
                  <p className={classes.statsHead}>Recent Result</p>
                  {recentResults?.length
                    ? recentResults?.map((x, i) => (
                        <span
                          className={
                            x === "W" ? classes.successText : classes.dangerText
                          }
                          key={i}
                        >
                          {x}&nbsp;
                        </span>
                      ))
                    : "--"}
                </Grid>
                <br />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item md={0.5}></Grid>
      <Grid item md={3} className={classes.rightRectangle}>
        <Typography sx={{ color: "#767676", padding: "2%" }}>
          About&nbsp;
          <img
            alt=""
            src={edit}
            onClick={() => setAboutEdit(true)}
            style={{ cursor: "pointer" }}
          />
        </Typography>
        <Typography className={classes.franchAboutSec}>
          {profile?.userDetail?.about && capitalize(profile?.userDetail?.about)}
        </Typography>
      </Grid>
    </Grid>
  );
}
