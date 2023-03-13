import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";

import GeneralModal from "../../../../../../components/topModal/topModal";
import { allWordsCapitalize } from "../../../../../../../utils/apiutils";
import UseRoundTable from "../../../../../../components/UseRoundTable/useTable";
import { capitalize } from "../../../../../../../utils/apisauce";
import versusIcon from "../../../../../../../assets/versus.png";
import { headCellsModal as headCells } from "./tblColumns";
import GeneralText from "../../../../../../components/generalText/generalText";
import MatchTeamsProfile from "../../MatchTeamsProfile/MatchTeamsProfile";
import { getScheduleMatchProfile } from "../../../reducers";
import classes from "../schedule.module.scss";

const Tabs = ["Rounds", "Playoffs", "Finals"];

const Rounds = ({ rounds, showMatchTeamHandler }) => {
  const { TblContainer } = UseRoundTable([], headCells);

  return rounds?.length ? (
    rounds.map((rounds, i) => (
      <Box mt={2} className={classes.roundTable}>
        <Typography variant="h6" color="white" textAlign="left">
          Schedule Type:{" "}
          <Typography variant="span" color="#f26826" textAlign="left">
            Round{"    "} &nbsp;&nbsp; &nbsp;{" "}
          </Typography>
          Round No:{" "}
          <Typography variant="span" color="#f26826" textAlign="left">
            {rounds?.roundNumber}
          </Typography>
        </Typography>
        <TblContainer>
          {rounds?.matches?.length ? (
            rounds?.matches?.map((row, i) => {
              let noCellBorder = i !== rounds?.matches?.length - 1;
              return (
                <TableRow hover key={row._id}>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="left"
                    scope="row"
                  >
                    {row?.srNo}
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                  >
                    <Grid container>
                      <Grid item md={5.5} textAlign="right">
                        {capitalize(row?.teamOne)}
                      </Grid>
                      <Grid item md={1}>
                        <img
                          src={versusIcon}
                          alt="versus"
                          className={classes.vsIcon}
                        />
                      </Grid>
                      <Grid item md={5.5} textAlign="left">
                        {capitalize(row?.teamTwo)}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                    style={{ color: "#F26826" }}
                  >
                    {capitalize(row?.winner)}
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                  >
                    <IconButton onClick={() => showMatchTeamHandler(row?._id)}>
                      <VisibilityIcon
                        sx={{ color: "#F26826", cursor: "pointer" }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <Grid
              container
              marginY={4}
              justifyContent="end"
              alignItems="center"
              sx={{ fontSize: "20px", color: "#484848" }}
            >
              <span>No Rounds Found! </span>
            </Grid>
          )}
        </TblContainer>
      </Box>
    ))
  ) : (
    <Grid container marginY={4}>
      <GeneralText text="No Rounds yet!" />
    </Grid>
  );
};
const Playoffs = ({ playoffs, showMatchTeamHandler }) => {
  const { TblContainer } = UseRoundTable([], headCells);
  return playoffs?.length ? (
    playoffs.map((playoffs, i) => (
      <Box mt={2} className={classes.roundTable}>
        <Typography variant="h6" color="white" textAlign="left">
          Schedule Type:{" "}
          <Typography variant="span" color="#f26826" textAlign="left">
            Playoff{"    "} &nbsp;&nbsp; &nbsp;{" "}
          </Typography>
          Round No:{" "}
          <Typography variant="span" color="#f26826" textAlign="left">
            {playoffs?.roundNumber}
          </Typography>
        </Typography>
        <TblContainer>
          {playoffs?.matches?.length ? (
            playoffs?.matches?.map((row, i) => {
              let noCellBorder = i !== playoffs?.matches?.length - 1;
              return (
                <TableRow hover key={row._id}>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="left"
                    scope="row"
                  >
                    {row?.srNo}
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                  >
                    <Grid container>
                      <Grid item md={5.5} textAlign="right">
                        {capitalize(row?.teamOne)}
                      </Grid>
                      <Grid item md={1}>
                        <img
                          src={versusIcon}
                          alt="versus"
                          className={classes.vsIcon}
                        />
                      </Grid>
                      <Grid item md={5.5} textAlign="left">
                        {capitalize(row?.teamTwo)}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                    style={{ color: "#F26826" }}
                  >
                    {capitalize(row?.winner)}
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                  >
                    <IconButton onClick={() => showMatchTeamHandler(row?._id)}>
                      <VisibilityIcon
                        sx={{ color: "#F26826", cursor: "pointer" }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <Grid
              container
              marginY={4}
              justifyContent="end"
              alignItems="center"
              sx={{ fontSize: "20px", color: "#484848" }}
            >
              <span>No Playoffs Found! </span>
            </Grid>
          )}
        </TblContainer>
      </Box>
    ))
  ) : (
    <Grid container marginY={4}>
      <GeneralText text="No Playoffs yet!" />
    </Grid>
  );
};
const Finals = ({ finals, showMatchTeamHandler }) => {
  const { TblContainer } = UseRoundTable([], headCells);
  return finals?.length ? (
    finals.map((finals, i) => (
      <Box mt={2} className={classes.roundTable}>
        <Typography variant="h6" color="white" textAlign="left">
          Schedule Type:{" "}
          <Typography variant="span" color="#f26826" textAlign="left">
            Final {"    "} &nbsp;&nbsp; &nbsp;{" "}
          </Typography>
          Round No:{" "}
          <Typography variant="span" color="#f26826" textAlign="left">
            {finals?.roundNumber}
          </Typography>
        </Typography>
        <TblContainer>
          {finals?.matches?.length ? (
            finals?.matches?.map((row, i) => {
              let noCellBorder = i !== finals?.matches?.length - 1;
              return (
                <TableRow hover key={row._id}>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="left"
                    scope="row"
                  >
                    {row?.srNo}
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                  >
                    <Grid container>
                      <Grid item md={5.5} textAlign="right">
                        {capitalize(row?.teamOne)}
                      </Grid>
                      <Grid item md={1}>
                        <img
                          src={versusIcon}
                          alt="versus"
                          className={classes.vsIcon}
                        />
                      </Grid>
                      <Grid item md={5.5} textAlign="left">
                        {capitalize(row?.teamTwo)}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                    style={{ color: "#F26826" }}
                  >
                    {capitalize(row?.winner)}
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                  >
                    <IconButton onClick={() => showMatchTeamHandler(row?._id)}>
                      <VisibilityIcon
                        sx={{ color: "#F26826", cursor: "pointer" }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <Grid
              container
              marginY={4}
              justifyContent="end"
              alignItems="center"
              sx={{ fontSize: "20px", color: "#484848" }}
            >
              <span>No Finals Found! </span>
            </Grid>
          )}
        </TblContainer>
      </Box>
    ))
  ) : (
    <Grid container marginY={4}>
      <GeneralText text="No Finals yet!" />
    </Grid>
  );
};

export default function ScheduleModal({
  showmore,
  handleClose,
  rounds,
  playoffs,
  finals,
}) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("Rounds");
  const [showMatchTeams, setShowMatchTeams] = useState(false);

  const { scheduleMatchProfData } = useSelector(
    (state) => state.userFantasyLeagueProfile
  );

  const showMatchTeamHandler = (id) => {
    dispatch(getScheduleMatchProfile({ id: id }));
    setShowMatchTeams(true);
  };

  return (
    <GeneralModal
      open={showmore}
      handleClose={handleClose}
      widthe="90%"
      maxHait="650px"
    >
      <Typography variant="h5" color="white" textAlign="left">
        {showMatchTeams && (
          <IconButton onClick={() => setShowMatchTeams(false)}>
            <ChevronLeftIcon sx={{ color: "#F26826", pb: "3px" }} />
          </IconButton>
        )}
        Schedule
      </Typography>
      <Grid item md={12}>
        {!showMatchTeams ? (
          <>
            <Box style={{ float: "left", marginTop: "1%", marginBottom: "2%" }}>
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

            <Grid container spacing={2} className={classes.tabsSection}>
              {tab === Tabs[0] ? (
                <Rounds
                  rounds={rounds}
                  showMatchTeamHandler={showMatchTeamHandler}
                />
              ) : tab === Tabs[1] ? (
                <Playoffs
                  playoffs={playoffs}
                  showMatchTeamHandler={showMatchTeamHandler}
                />
              ) : tab === Tabs[2] ? (
                <Finals
                  finals={finals}
                  showMatchTeamHandler={showMatchTeamHandler}
                />
              ) : null}
            </Grid>
          </>
        ) : (
          <MatchTeamsProfile dataObj={scheduleMatchProfData} />
        )}
      </Grid>
    </GeneralModal>
  );
}
