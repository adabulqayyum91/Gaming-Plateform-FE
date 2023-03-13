import { Grid, Typography, Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import defaultBackImg from "../../../../assets/tourback.png";
import PrimaryButton from "../../../components/primaryButton/primaryButton";
import {
  getTeams,
  getFranchiseLeague,
  joinLeague,
  addResult,
  setIsDeleted,
  getFranchiseLeagueSchedule,
  getFranchiseLeagueStandings,
  getFranchiseLeagueStats,
} from "./reducers";
import JoinTeamModal from "../../../components/joinTeamModal/joinTeamModal";

import classes from "./index.module.scss";
import Teams from "./components/Teams/teams";
import { allWordsCapitalize } from "../../../../utils/apiutils";
import CenterBar from "./components/CenterBar/centerBar";
import Schedule from "./components/Schedule/schedule";
import Standings from "./components/Standings/standings";
import Stats from "./components/Stats/stats";
import UploadLeagueResult from "../../../components/uploadLeagueResult/uploadResultModal";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";
const USER_ID = localStorage.getItem("user_id");
const Tabs = ["Teams", "Schedule", "Standings", "Stats"];

export default function LeagueProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [joinTour, setJoinTour] = useState(false);
  const [tab, setTab] = useState("Schedule");
  const [resultModal, setResultModal] = useState(false);

  const { league, teams, leagueScheduleData, leagueStandings, leagueStats } =
    useSelector((state) => state.userFranchiseLeagueProfile);
  const { franchise } = useSelector((state) => state.userFranchiseProfile);
  const { profile } = useSelector((state) => state.userProfile);

  const BackImg = league.leagueTitleImage
    ? BASE_URL + league.leagueTitleImage
    : defaultBackImg;

  const { id } = useParams();
  const userMode = profile?.userType?.mode?.toLowerCase();

  useEffect(() => {
    if (tab === "Schedule") {
      dispatch(getFranchiseLeagueSchedule({ leagueId: id }));
    } else if (tab === "Stats") {
      dispatch(getFranchiseLeagueStats({ leagueId: id }));
    } else if (tab === "Standings") {
      dispatch(getFranchiseLeagueStandings({ leagueId: id }));
    }
  }, [tab]);
  useEffect(() => {
    dispatch(getFranchiseLeague({ id: id }));
  }, []);
  const handleJoinTour = (values) => {
    dispatch(joinLeague(values));
    setJoinTour(false);
  };
  const handleClose = () => {
    setJoinTour(false);
    setResultModal(false);
  };
  const setJoinTourHanlder = () => {
    setJoinTour(true);
    dispatch(getTeams());
  };
  const handleUploadResult = (values) => {
    dispatch(addResult(values));
    setResultModal(false);
  };
  return (
    <>
      <JoinTeamModal
        id={id}
        teams={teams}
        open={joinTour}
        name={league?.leagueName}
        titleImage={BackImg}
        formFieldName={"leagueId"}
        handleClose={handleClose}
        handleJoinTour={handleJoinTour}
      />
      <UploadLeagueResult
        id={id}
        open={resultModal}
        name={league?.leagueName}
        titleImage={BackImg}
        handleClose={handleClose}
        leagueScheduleData={leagueScheduleData}
        handleUploadResult={handleUploadResult}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid
            item
            md={12}
            className={classes.topSection}
            style={{
              background: `url('${BackImg}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <IconButton
              onClick={() => navigate(-1)}
              className={classes.backChevron}
            >
              <ChevronLeftIcon sx={{ color: "#F26826", pb: "3px" }} />
            </IconButton>
            <Grid container className={classes.leagueProfileImg}>
              <Grid item md={6}>
                <Box className={classes.gameToPlay}>
                  <span className={classes.startingAt}>STARTING AT</span> &nbsp;
                  <span className={classes.timetext}>
                    {league?.startingDate}
                  </span>
                </Box>
              </Grid>
              <Grid item md={6} className={classes.joinButton}>
                {league?.leagueJoined ? (
                  <PrimaryButton
                    title="Add Result"
                    clickHandler={() => setResultModal(true)}
                  />
                ) : !league?.leagueJoined && userMode === "fmember" ? (
                  <PrimaryButton
                    title="Join League"
                    clickHandler={setJoinTourHanlder}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} className={classes.centerBar}>
            <Typography component="p" className={classes.leagueName}>
              {allWordsCapitalize(league?.leagueName)}
            </Typography>
            <CenterBar league={league} />
          </Grid>
          <Box style={{ float: "left" }}>
            {Tabs.map((x) => (
              <Typography
                component="span"
                className={tab === x ? classes.styledTab : classes.tabType}
                onClick={() => setTab(x)}
              >
                {allWordsCapitalize(x)}
              </Typography>
            ))}
          </Box>
          <Grid item md={12}>
            <Grid container spacing={2} className={classes.tabsSection}>
              {tab === Tabs[0] ? (
                <Teams league={league} />
              ) : tab === Tabs[1] ? (
                <Schedule leagueScheduleData={leagueScheduleData} id={id} />
              ) : tab === Tabs[2] ? (
                <Standings standings={leagueStandings} />
              ) : tab === Tabs[3] ? (
                <Stats stats={leagueStats} />
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
