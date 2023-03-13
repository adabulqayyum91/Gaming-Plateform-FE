import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import FlTeamPlayerCard from "../../../../../components/FlTeamPlayerCard/FlTeamPlayerCard";
import { capitalize } from "@material-ui/core";
import GeneralText from "../../../../../components/generalText/generalText";
import classes from "./MatchTeamsProfile.module.scss";

export default function MatchTeamsProfile({ dataObj }) {
  return (
    <Grid item md={12} textAlign="left">
      <Box>
        <Typography
          component="p"
          color="white"
          fontWeight="bold"
          fontSize="30px"
          my={3}
        >
          {capitalize(dataObj?.teamOne?.flTeamName ?? "")}
          <Typography
            component="span"
            color="#F26826"
            fontWeight="bold"
            fontSize="30px"
            pl={3}
          >
            {dataObj?.teamOne?.teamPoints} PTS
          </Typography>
        </Typography>
        <Grid container columnSpacing={2} className={classes.matchTeamScroll}>
          {dataObj?.teamOne?.teamData?.length ? (
            dataObj?.teamOne?.teamData?.map((x, i) => {
              return (
                <Grid item key={i}>
                  <FlTeamPlayerCard
                    key={x._id}
                    win={x.win}
                    points={x.points}
                    name={x.userName}
                    img={x.profileImage}
                    winPercentage={x.winPercentage}
                  />
                </Grid>
              );
            })
          ) : (
            <GeneralText text="No Teams Found!" height="15px" />
          )}
        </Grid>
      </Box>
      <Box>
        <Typography
          component="p"
          color="white"
          fontWeight="bold"
          fontSize="30px"
          my={3}
        >
          {capitalize(dataObj?.teamTwo?.flTeamName ?? "")}
          <Typography
            component="span"
            color="#F26826"
            fontWeight="bold"
            fontSize="30px"
            pl={3}
          >
            {dataObj?.teamTwo?.teamPoints} PTS
          </Typography>
        </Typography>
        <Grid container columnSpacing={2} className={classes.matchTeamScroll}>
          {dataObj?.teamTwo?.teamData?.length ? (
            dataObj?.teamTwo?.teamData?.map((x, i) => {
              return (
                <Grid item key={i}>
                  <FlTeamPlayerCard
                    key={x._id}
                    win={x.win}
                    points={x.points}
                    name={x.userName}
                    img={x.profileImage}
                    winPercentage={x.winPercentage}
                  />
                </Grid>
              );
            })
          ) : (
            <GeneralText text="No Teams Found!" height="150px" />
          )}
        </Grid>
      </Box>
    </Grid>
  );
}
