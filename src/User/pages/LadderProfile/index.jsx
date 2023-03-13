import { useParams, useNavigate } from "react-router";
import {
  Grid,
  IconButton,
  Typography,
  Box,
  TableRow,
  TableCell,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import teamSizeImg from "../../../assets/Group 168(1).svg";
import registeredImg from "../../../assets/Mask Group 8.svg";
import bracketImg from "../../../assets/Mask Group 9.svg";
import MiniDetail from "../../components/miniDetail/miniDetail";
import pricePoolImg from "../../../assets/Group 16.svg";
import tourBackImg from "../../../assets/tourback.png";
import PrimaryButton from "../../components/primaryButton/primaryButton";
import {
  getTeams,
  getLadder,
  joinLadder,
  addResult,
  getTotalWarLadder,
  addTotalWarLadderResult,
} from "./reducers";
import JoinTeamModal from "../../components/joinTeamModal/joinTeamModal";
import UseTable from "../../components/UseTable/useTable";
import UploadResultModal from "../../components/uploadResultModal/uploadResultModal";
import { headCells } from "./components/tblCells";
import { capitalize } from "../../../utils/apisauce";
import classes from "./ladderProfile.module.scss";
import {
  allWordsCapitalize,
  isDatePassed,
  timeFormate,
  tooltipTrim,
} from "../../../utils/apiutils";
import TotalWarLadders from "./components/totalWarLadders";
import GeneralText from "../../components/generalText/generalText";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";
const Tabs = ["Ladder", "Ladder Standing"];

export default function LadderProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState("Ladder");
  const [joinTour, setJoinTour] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [warLaderResultModal, setWarLaderResultModal] = useState(false);

  const { ladder, teams, totalWarLadders } = useSelector(
    (state) => state.userLadderProfile
  );
  const { ladderTeamRecord } = ladder;

  const BackImg = ladder.ladderTitleImage
    ? BASE_URL + ladder.ladderTitleImage
    : tourBackImg;

  const { TblContainer } = UseTable(ladder, headCells);

  useEffect(() => {
    dispatch(getLadder({ id: id }));
  }, []);
  useEffect(() => {
    if (tab === "Ladder Standing") {
      dispatch(getTotalWarLadder({ ladderId: id }));
    }
  }, [tab]);

  const handleJoinTour = (values) => {
    dispatch(joinLadder(values));
    setJoinTour(false);
  };
  const setJoinTourHanlder = () => {
    setJoinTour(true);
    dispatch(getTeams());
  };
  const handleUploadResult = (values) => {
    if (warLaderResultModal) {
      dispatch(addTotalWarLadderResult(values));
    } else {
      dispatch(addResult(values));
    }
    setResultModal(false);
    setWarLaderResultModal(false);
  };
  const handleClose = () => {
    setJoinTour(false);
    setResultModal(false);
    setWarLaderResultModal(false);
  };

  return (
    <>
      <JoinTeamModal
        id={id}
        teams={teams}
        open={joinTour}
        name={ladder.ladderName}
        titleImage={BackImg}
        formFieldName={"ladderId"}
        handleClose={handleClose}
        handleJoinTour={handleJoinTour}
      />
      <UploadResultModal
        id={id}
        open={resultModal || warLaderResultModal}
        name={ladder.ladderName}
        titleImage={BackImg}
        teamId={ladder.teamId}
        formFieldName={"ladderId"}
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
            <Grid container className={classes.ladderProfileImg}>
              <Grid item md={6}>
                <Box className={classes.gameName}>
                  {ladder.ladderStartDate} <br />
                  STARTING AT
                  <span className={classes.timetext}>
                    {" "}
                    {ladder.ladderStartTime} UTC{" "}
                  </span>
                </Box>
              </Grid>
              <Grid item md={6} className={classes.joinButton}>
                {!ladder.ladderJoined ? (
                  <PrimaryButton
                    title="Join Ladder"
                    clickHandler={setJoinTourHanlder}
                  />
                ) : (
                  !isDatePassed(ladder.ladderEndDate) && (
                    <PrimaryButton
                      title="Add Result"
                      clickHandler={() => setResultModal(true)}
                    />
                  )
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} className={classes.centerBar}>
            <Typography component="p" className={classes.ladderName}>
              {capitalize(ladder?.ladderName)}
            </Typography>
            <Box pb={5} pt={2}>
              {Tabs.map((x) => (
                <Typography
                  key={x}
                  component="span"
                  onClick={() => setTab(x)}
                  className={tab === x ? classes.styledTab : classes.tabType}
                >
                  {allWordsCapitalize(x)}
                </Typography>
              ))}
            </Box>
            {tab === "Ladder Standing" && (
              <TotalWarLadders
                teamId={ladder?.teamId}
                matches={totalWarLadders?.matches}
                matchResults={totalWarLadders?.matchResults}
                resultSubmit={totalWarLadders?.resultSubmit}
                setWarLaderResultModal={setWarLaderResultModal}
              />
            )}
            {tab === "Ladder" && (
              <Box className={classes.miniDetailsBar}>
                <Grid container>
                  <Grid item md={12 / 5}>
                    <MiniDetail
                      logo={pricePoolImg}
                      title={"Prize Pool"}
                      value={ladder.prize}
                    />
                  </Grid>
                  <Grid item md={12 / 5}>
                    <MiniDetail
                      logo={teamSizeImg}
                      title={"Team Size"}
                      value={ladder.teamSize}
                    />
                  </Grid>
                  <Grid item md={12 / 5}>
                    <MiniDetail
                      logo={pricePoolImg}
                      title={"Entry Fee"}
                      value={ladder.entryFee}
                    />
                  </Grid>
                  <Grid item md={12 / 5}>
                    <MiniDetail
                      logo={registeredImg}
                      title={"Registered"}
                      value={ladder.registered}
                    />
                  </Grid>
                  <Grid item md={12 / 5}>
                    <MiniDetail
                      logo={bracketImg}
                      title={"Total teams"}
                      value={ladder.totalTeams}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>

          {tab === "Ladder" &&
            (ladderTeamRecord?.length ? (
              <TblContainer>
                {ladderTeamRecord.map((row) => {
                  const streakResClr =
                    row.streakResult &&
                      row.streakResult[row.streakResult?.length - 1] === "W"
                      ? "#77F226"
                      : "#F22626";
                  return (
                    <TableRow className={classes.tblrow} hover key={row._id}>
                      <TableCell align="left" scope="row" padding="none">
                        {row?.standing}
                      </TableCell>
                      <TableCell align="center">
                        {tooltipTrim(row?.teamViewName, 20)}
                      </TableCell>
                      <TableCell align="center" style={{ color: "#77F226" }}>
                        {row?.winCount}
                      </TableCell>
                      <TableCell align="center" style={{ color: "#F22626" }}>
                        {row?.lossCount}
                      </TableCell>
                      <TableCell align="center">
                        {row.winPercentage && !row.winPercentage === "NaN%"
                          ? row.winPercentage
                          : "--"}
                      </TableCell>
                      <TableCell align="center" style={{ color: streakResClr }}>
                        {row.streakResult ? row.streakResult : "--"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TblContainer>
            ) : (
              <GeneralText text="No Table Records Found!" height="200px" />
            ))}
        </Grid>
      </Box>
    </>
  );
}
