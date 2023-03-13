import { Grid, Box, TableRow, TableCell } from "@mui/material";
import React from "react";
import { tooltipTrim } from "../../../../utils/apiutils";
import GeneralText from "../../../components/generalText/generalText";

import UseTable from "../../../components/UseTable/useTable";
import { totalWarTblCells } from "./../components/tblCells";

import classes from "./../ladderProfile.module.scss";
import VersusTile from "./versusTile";

export default function TotalWarLadders({
  teamId,
  matches = [],
  matchResults = [],
  resultSubmit,
  setWarLaderResultModal,
}) {
  const { TblContainer } = UseTable([], totalWarTblCells);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container mb={5}>
        {matches?.map((x, i) => {
          let firstId = x?.teamOne?._id;
          let secondId = x?.teamTwo?._id;
          let isMatchPrticipent = teamId === firstId || teamId === secondId;
          console.log(isMatchPrticipent, teamId, firstId, secondId);
          return (
            <Grid
              item
              key={x._id}
              sm={12 / 2}
              md={12 / 4}
              lg={12 / 4}
              xl={12 / 4}
            >
              <VersusTile
                id={x._id}
                firstName={x?.teamOne?.teamViewName}
                secondName={x?.teamTwo?.teamViewName}
                isMatchPrticipent={isMatchPrticipent}
                firstImg={x?.teamOne?.teamTitleImage}
                secondImg={x?.teamTwo?.teamTitleImage}
                resultSubmit={resultSubmit}
                setWarLaderResultModal={setWarLaderResultModal}
              />
            </Grid>
          );
        })}
      </Grid>
      {matchResults?.length ? (
        <TblContainer>
          {matchResults?.map((row) => {
            return (
              <TableRow className={classes.tblrow} hover key={row._id}>
                <TableCell align="left" scope="row" padding="none">
                  {row?.standing}
                </TableCell>
                <TableCell align="center">
                  {tooltipTrim(row?.team, 20)}
                </TableCell>
                <TableCell align="center" style={{ color: "#77F226" }}>
                  {row?.win}
                </TableCell>
                <TableCell align="center" style={{ color: "#F22626" }}>
                  {row?.loss}
                </TableCell>
              </TableRow>
            );
          })}
        </TblContainer>
      ) : (
        <GeneralText text="No Table Records Found!" height="200px" />
      )}
    </Box>
  );
}
