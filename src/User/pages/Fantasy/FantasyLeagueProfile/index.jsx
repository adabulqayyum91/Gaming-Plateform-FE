import { Grid, Typography, Box, IconButton } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";

import {
  getFlLeaderboard,
  getFlProfile,
  getFlSchedule,
  getFlStats,
  joinFL,
  sendFlInvitation,
} from "./reducers";
import classes from "./index.module.scss";
import Rules from "./components/Rules/rules";
import {
  allWordsCapitalize,
  dateTimeFormate,
  getDifferenceInSeconds,
  tooltipTrim,
} from "../../../../utils/apiutils";
import PrimaryButton from "../../../components/primaryButton/primaryButton";
import NewsTile from "../../../components/newsTile/newsTile";
import Stats from "./components/Stats/stats";
import Leaderboard from "./components/Leaderboard/leaderboard";
import Schedule from "./components/Schedule/schedule";
import Teams from "./components/Teams/teams";
import JoinTeamModal from "../../TeamProfile/modal/friendRequest";
import { getFriends } from "../../TeamProfile/reducers";
import { PhotoProvider, PhotoView } from "react-photo-view";

const Tabs = ["Teams", "Schedule", "Leaderboard", "Stats"];
const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function FantasyLeagueProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("Teams");
  const [teamReqModal, setTeamReqModal] = useState(false);

  const {
    profile,
    leagueScheduleData,
    leagueLeaderboardData,
    leagueStatsData,
  } = useSelector((state) => state.userFantasyLeagueProfile);
  const { friends } = useSelector((state) => state.userTeamProfile);

  const isLeagueStarted = getDifferenceInSeconds(
    new Date(),
    new Date(profile?.draftDateAndTime)
  );
  useEffect(() => {
    if (tab === "Schedule") {
      dispatch(getFlSchedule({ id: id }));
    } else if (tab === "Leaderboard") {
      dispatch(getFlLeaderboard({ id: id }));
    } else if (tab === "Stats") {
      dispatch(getFlStats({ id: id }));
    }
  }, [tab]);
  useLayoutEffect(() => {
    dispatch(getFlProfile({ id: id }));
    dispatch(getFriends());
  }, []);
  const handleTeamInviteToFriend = (values) => {
    dispatch(
      sendFlInvitation({
        fantasyLeagueId: id,
        friendId: values.friendId,
      })
    );
    setTeamReqModal(false);
  };
  const joinFLeague = () => {
    dispatch(joinFL({ fantasyLeagueId: id }));
  };
  const handleClose = () => {
    setTeamReqModal(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {teamReqModal && (
        <JoinTeamModal
          friends={friends}
          open={teamReqModal}
          handleClose={handleClose}
          handleTeamInviteToFriend={handleTeamInviteToFriend}
        />
      )}
      <Grid container className={classes.flTopContainer}>
        <Grid item>
          <IconButton onClick={() => navigate(-1)}>
            <ChevronLeftIcon sx={{ color: "#F26826", pb: "3px" }} />
          </IconButton>
          <PhotoProvider>
            <PhotoView src={BASE_URL + profile?.flTitleImage}>
              <img
                alt=""
                src={BASE_URL + profile?.flTitleImage}
                className={classes.flImg}
              />
            </PhotoView>
          </PhotoProvider>
        </Grid>
        <Grid item textAlign="left" md={7} lg={7}>
          <Box className={classes.flName} pl={3}>
            <Typography component="h6" sx={{ color: "white", fontSize: 30 }}>
              {tooltipTrim(profile?.flName, 40)}
            </Typography>
            <Typography component="p" sx={{ color: "#B9B9C2", fontSize: 18 }}>
              Draft Schedule: {dateTimeFormate(profile?.draftDateAndTime)}
            </Typography>
          </Box>
        </Grid>
        {!profile?.leagueJoined && !isLeagueStarted && (
          <Grid item md={3} lg={3}>
            <PrimaryButton
              pad="10px 60px"
              title="Join League"
              clickHandler={joinFLeague}
            />
          </Grid>
        )}
      </Grid>
      <Grid container className={classes.bottomContainer}>
        <Grid item md={8} className={classes.centerBar}>
          <Box>
            {Tabs.map((x) => (
              <Typography
                component="span"
                onClick={() => setTab(x)}
                className={tab === x ? classes.styledTab : classes.tabType}
              >
                {allWordsCapitalize(x)}
              </Typography>
            ))}
          </Box>
          <Box sx={{ marginTop: "50px" }}>
            {tab == "Teams" ? (
              <Teams
                id={id}
                profile={profile}
                isOwner={profile?.flAdmin}
                isLeagueStarted={isLeagueStarted}
                setTeamReqModal={setTeamReqModal}
              />
            ) : tab == "Schedule" ? (
              <Schedule leagueScheduleData={leagueScheduleData} />
            ) : tab == "Leaderboard" ? (
              <Leaderboard
                profile={profile}
                leaderboard={leagueLeaderboardData}
              />
            ) : tab == "Stats" ? (
              <Stats stats={leagueStatsData} />
            ) : (
              ""
            )}
          </Box>
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={3}>
          <Typography component="h6" sx={{ color: "white", fontSize: 30 }}>
            News
          </Typography>
          {Array(1)
            .fill()
            .map((x, i) => (
              <NewsTile key={i} />
            ))}
        </Grid>
      </Grid>
    </Box>
  );
}
