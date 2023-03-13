import React, { useState, useEffect } from "react";
import { Box, Grid, TableCell, TableRow, Typography } from "@mui/material";

import GeneralModal from "../../../../../../components/topModal/topModal";
import { allWordsCapitalize } from "../../../../../../../utils/apiutils";
import UseRoundTable from "../../../../../../components/UseRoundTable/useTable";
import { capitalize } from "../../../../../../../utils/apisauce";
import versusIcon from "../../../../../../../assets/versus.png";
import { headCells } from "./tblColumns";
import classes from "../schedule.module.scss";
import GeneralText from "../../../../../../components/generalText/generalText";

const Tabs = ["Rounds", "Playoffs", "Finals"];

const Rounds = ({ rounds }) => {
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
                    {row?.matchId}
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                  >
                    {capitalize(row?.teamOne)}
                    <img
                      src={versusIcon}
                      alt="versus"
                      className={classes.vsIcon}
                    />
                    {capitalize(row?.teamTwo)}
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                    style={{ color: "#F26826" }}
                  >
                    {capitalize(row?.winner)}
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
const Playoffs = ({ playoffs }) => {
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
                    {row?.matchId}
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                  >
                    {capitalize(row?.teamOne)}
                    <img
                      src={versusIcon}
                      alt="versus"
                      className={classes.vsIcon}
                    />
                    {capitalize(row?.teamTwo)}
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                    style={{ color: "#F26826" }}
                  >
                    {capitalize(row?.winner)}
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
const Finals = ({ finals }) => {
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
                    {row?.matchId}
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                  >
                    {capitalize(row?.teamOne)}
                    <img
                      src={versusIcon}
                      alt="versus"
                      className={classes.vsIcon}
                    />
                    {capitalize(row?.teamTwo)}
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                    style={{ color: "#F26826" }}
                  >
                    {capitalize(row?.winner)}
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
  const [tab, setTab] = useState("Rounds");
  return (
    <GeneralModal open={showmore} handleClose={handleClose} widthe="90%">
      <Typography variant="h5" color="white" textAlign="left">
        Schedule
      </Typography>
      <Grid item md={12}>
        <Box style={{ float: "left", marginTop: "1%", marginBottom: "2%" }}>
          {Tabs.map((x, index) => (
            <Typography
              key={index}
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
            <Rounds rounds={rounds} />
          ) : tab === Tabs[1] ? (
            <Playoffs playoffs={playoffs} />
          ) : tab === Tabs[2] ? (
            <Finals finals={finals} />
          ) : null}
        </Grid>
      </Grid>
    </GeneralModal>
  );
}
