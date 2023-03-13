import { Grid, Typography, Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useParams, useNavigate } from "react-router";
// import { useHistory } from "react-router-dom";

import teamSizeImg from "../../../assets/Group 168(1).svg";
import registeredImg from "../../../assets/Mask Group 8.svg";
import bracketImg from "../../../assets/Mask Group 9.svg";
import MiniDetail from "../../components/miniDetail/miniDetail";
import pricePoolImg from "../../../assets/Group 16.svg";
import tourBackImg from "../../../assets/tourback.png";
import MediumTile from "../../components/mediumTile/mediumTile";
import PrimaryButton from "../../components/primaryButton/primaryButton";
import { addResult, getTeams, getTournament, joinTournament } from "./reducers";
import WinningTeamTile from "../../components/winningTeamTile/winningTeamTile";
import JoinTeamModal from "../../components/joinTeamModal/joinTeamModal";
import { dateFormate, timeFormate } from "../../../utils/apiutils";
import { capitalize } from "../../../utils/apisauce";
import classes from "./index.module.scss";
import UploadResultModal from "../../components/uploadResultModal/uploadResultModal";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";
const userId = localStorage.getItem("user_id");

export default function TournamentProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resultModal, setResultModal] = useState(false);
  const [joinTour, setJoinTour] = useState(false);
  const { tournament, teams } = useSelector(
    (state) => state.userTournamentProfile
  );
  const BackImg = tournament.tournamentTitleImage
    ? BASE_URL + tournament.tournamentTitleImage
    : tourBackImg;

  const { id } = useParams();

  useEffect(() => {
    dispatch(getTournament({ id: id }));
  }, []);
  const handleJoinTour = (values) => {
    dispatch(joinTournament(values));
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

  const winningTeam = tournament?.winningTeam
    ? tournament.tournamentTeamRecord?.filter((x) => {
        return tournament?.winningTeam === x.teamId;
      })
    : "";
  const team = tournament?.tournamentTeamRecord?.filter((x) =>
    x.teamLeaderId === userId ? x.teamId : null
  );
  return (
    <>
      <JoinTeamModal
        id={id}
        teams={teams}
        open={joinTour}
        name={tournament.tournamentName}
        titleImage={BackImg}
        formFieldName={"tournamentId"}
        handleClose={handleClose}
        handleJoinTour={handleJoinTour}
      />
      <UploadResultModal
        id={id}
        open={resultModal}
        name={tournament.tournamentName}
        titleImage={BackImg}
        teamId={team?.length ? team[0]?.teamId : null}
        formFieldName={"tournamentId"}
        handleClose={handleClose}
        handleUploadResult={handleUploadResult}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid
            item
            md={12}
            className={classes.topSection}
            style={{
              backgroundImage: `url('${BackImg}')`,
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
            <Grid container className={classes.tournamentProfileImg}>
              <Grid item md={6}>
                <Box className={classes.gameName}>
                  {dateFormate(tournament.startingDateAndTime)} <br />
                  STARTING AT &nbsp;
                  <span className={classes.timetext}>
                    {timeFormate(tournament.startingDateAndTime)} UTC{" "}
                  </span>
                </Box>
              </Grid>
              {!tournament.tournamentJoined ? (
                <Grid item md={6} className={classes.joinButton}>
                  <PrimaryButton
                    title="Join Tournament"
                    clickHandler={setJoinTourHanlder}
                  />
                </Grid>
              ) : (
                <Grid item md={6} className={classes.joinButton}>
                  <PrimaryButton
                    title="Add Result"
                    clickHandler={() => setResultModal(true)}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item md={12} className={classes.centerBar}>
            <Typography component="p" className={classes.tournamentName}>
              {capitalize(tournament?.tournamentName)}
            </Typography>
            <Box className={classes.miniDetailsBar}>
              <Grid container>
                <Grid item md={12 / 5}>
                  <MiniDetail
                    logo={pricePoolImg}
                    title={"Prize Pool"}
                    value={tournament.prize}
                  />
                </Grid>
                <Grid item md={12 / 5}>
                  <MiniDetail
                    logo={teamSizeImg}
                    title={"Team Size"}
                    value={tournament.teamSize}
                  />
                </Grid>
                <Grid item md={12 / 5}>
                  <MiniDetail
                    logo={pricePoolImg}
                    title={"Entry Fee"}
                    value={tournament.entryFee}
                  />
                </Grid>
                <Grid item md={12 / 5}>
                  <MiniDetail
                    logo={registeredImg}
                    title={"Registered"}
                    value={tournament.registered}
                  />
                </Grid>
                <Grid item md={12 / 5}>
                  <MiniDetail
                    logo={bracketImg}
                    title={"Total teams"}
                    value={tournament.totalTeams}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Typography component="p" color="white">
              Tournament Teams
            </Typography>
            {tournament && tournament?.tournamentTeamRecord?.length >= 1 ? (
              <Grid container className={classes.bottomBar}>
                <Grid item md={7}>
                  <Grid container>
                    {tournament?.tournamentTeamRecord?.map((x, i) => (
                      <Grid item md={12} lg={12 / 2} xl={12 / 2} xs={12}>
                        <MediumTile
                          key={i}
                          roosters={x.roosters}
                          teamName={x.teamViewName}
                          teamLeader={x.teamLeader}
                          teamImg={x.teamTitleImage}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item md={1}></Grid>
                <Grid item md={4} className={classes.winningBox}>
                  {winningTeam !== "" ? (
                    <WinningTeamTile
                      teamImg={winningTeam[0]?.teamTitleImage}
                      teamName={winningTeam[0]?.teamViewName}
                      matches={"0"}
                      win={winningTeam[0]?.winsCount}
                      winPerc={winningTeam[0]?.winPercentage}
                      loss={winningTeam[0]?.lossCount}
                    />
                  ) : (
                    <span>RESULT PENDING</span>
                  )}
                </Grid>
              </Grid>
            ) : (
              <Typography
                component="p"
                color="white"
                className={classes.bottomBar}
              >
                NO TEAM HERE
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
