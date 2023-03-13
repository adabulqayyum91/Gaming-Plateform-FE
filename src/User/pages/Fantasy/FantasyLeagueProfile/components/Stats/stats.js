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
          {stats.map((row) => {
            return (
              <TableRow hover key={row._id}>
                <TableCell align="left" scope="row" padding="none">
                  {row?.rank}
                </TableCell>
                <TableCell align="center">
                  {tooltipTrim(row?.userName, 20)}
                </TableCell>
                <TableCell align="center">{row?.pickPercentage}</TableCell>
                <TableCell align="center">{row?.points}</TableCell>
              </TableRow>
            );
          })}
        </TblContainer>
      ) : (
        <Grid container sx={{ width: "100%", height: "100px" }}>
          <GeneralText text="No Stats Found!" />
        </Grid>
      )}
    </>
  );
}
