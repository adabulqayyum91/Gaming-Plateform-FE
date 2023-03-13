import React from "react";
import { TableRow, TableCell, Grid } from "@mui/material";

import { headCells } from "./tblColumns";
import GeneralText from "../../../../../components/generalText/generalText";
import UseTable from "../../../../../components/UseTable/useTable";
import { tooltipTrim } from "../../../../../../utils/apiutils";

export default function Stats({ stats }) {
  const { TblContainer } = UseTable(stats, headCells);
  return (
    <>
      {stats?.length ? (
        <TblContainer>
          {stats.map((row, i) => {
            return (
              <TableRow hover key={row._id}>
                <TableCell align="left" scope="row" padding="none">
                  {i + 1}
                </TableCell>
                <TableCell align="center">
                  {tooltipTrim(row?.teamName, 20)}
                </TableCell>
                <TableCell align="center">{row?.matches}</TableCell>
                <TableCell align="center">
                  {row?.placePoints ? row.placePoints : 0}
                </TableCell>
                <TableCell align="center">
                  {row?.killPoints ? row.killPoints : 0}
                </TableCell>
                <TableCell align="center">
                  {row?.totalPoints ? row.totalPoints : 0}
                </TableCell>
                <TableCell align="center">
                  {row?.streak ? row.streak : 0}
                </TableCell>
              </TableRow>
            );
          })}
        </TblContainer>
      ) : (
        <Grid
          container
          sx={{ background: "#282828", width: "100%", height: "100px" }}
        >
          <GeneralText text="No Stats Found!" />
        </Grid>
      )}
    </>
  );
}
