import React from "react";
import { Grid, Box } from "@mui/material";

import MiniDetail from "../../../../components/miniDetail/miniDetail";
import winPer from "../../../../../assets/Group 1541.svg";
import lossImg from "../../../../../assets/Group 1540.svg";
import winImg from "../../../../../assets/Group 1539.svg";
import gameImg from "../../../../../assets/noun-game-2007259.svg";
import profileSelfImg from "../../../../../assets/teamprofile.png";
import LeaderTile from "./leaderTile";
import Rosters from "./rosters";
import classes from "./bottomSection.module.scss";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function BottomSection({
  profile,
  setFriendModal,
  kickoutHanlder,
}) {
  const {
    fullName: LName,
    wins: LWins,
    loss: LLoss,
    profileImage: LProfileImage,
  } = profile?.leader;
  const LeaderProfileImg = LProfileImage
    ? BASE_URL + LProfileImage
    : profileSelfImg;
  return (
    <Box>
      <Grid container>
        <Grid item md={8.5}>
          <Grid container className={classes.statusBar}>
            <Grid item md={12 / 5}>
              <MiniDetail
                logo={gameImg}
                title={"Matches"}
                value={profile.matches}
              />
            </Grid>
            <Grid item md={12 / 5}>
              <MiniDetail logo={winImg} title={"Win"} value={profile.wins} />
            </Grid>
            <Grid item md={12 / 5}>
              <MiniDetail logo={lossImg} title={"Loss"} value={profile.loss} />
            </Grid>
            <Grid item md={12 / 5}>
              <MiniDetail
                logo={winPer}
                title={"Win%"}
                value={profile.winPercentage ? profile.winPercentage : "--"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={0.5}></Grid>
        <Grid item md={3}>
          <LeaderTile
            title={LName}
            wins={LWins}
            loss={LLoss}
            profileImg={LeaderProfileImg}
          />
        </Grid>
      </Grid>
      <Rosters
        rooster={profile.rooster}
        setFriendModal={setFriendModal}
        kickoutHanlder={kickoutHanlder}
      />
    </Box>
  );
}
