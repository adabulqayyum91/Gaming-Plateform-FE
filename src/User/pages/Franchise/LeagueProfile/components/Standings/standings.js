import React from "react";
import { TableRow, TableCell, Grid } from "@mui/material";

import { headCells } from "./tblColumns";
import GeneralText from "../../../../../components/generalText/generalText";
import UseTable from "../../../../../components/UseTable/useTable";
import { tooltipTrim } from "../../../../../../utils/apiutils";

export default function Standings({ standings }) {
  const { TblContainer } = UseTable(standings, headCells);
  return (
    <>
      {standings?.length ? (
        <TblContainer>
          {standings.map((row) => {
            return (
              <TableRow hover key={row._id}>
                <TableCell align="left" scope="row" padding="none">
                  {row?.standing}
                </TableCell>
                <TableCell align="center">
                  {tooltipTrim(row?.teamName, 20)}
                </TableCell>
                <TableCell align="center">{row?.winCount}</TableCell>
                <TableCell align="center">{row?.lossCount}</TableCell>
                <TableCell align="center">{row?.winPercentage}</TableCell>
              </TableRow>
            );
          })}
        </TblContainer>
      ) : (
        <Grid
          container
          sx={{ background: "#282828", width: "100%", height: "100px" }}
        >
          <GeneralText text="No Standings Found!" />
        </Grid>
      )}
    </>
  );
}
