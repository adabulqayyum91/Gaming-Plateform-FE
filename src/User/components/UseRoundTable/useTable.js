import React from "react";
import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import { styled } from "@mui/styles";
import classes from "./useTable.module.scss";

const MyTable = styled(Table)({
  "& .MuiTableCell-root": {
    color: "white",
    padding: "10px 0px",
    paddingLeft: "10px",
    borderBottom: "1px solid #767676",
  },
  "& .MuiTablePagination-root": {
    display: "none",
  },
});

export default function UseRoundTable(record, headCells) {
  const TblHead = () => {
    return (
      <TableHead style={{ background: "#1A1A1A" }}>
        <TableRow className={classes.headRow}>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "center" : "left"}
              style={{ color: "#f26826 !important" }}
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const TblContainer = (props) => (
    <MyTable
      sx={{ width: "100%" }}
      aria-labelledby="tableTitle"
      size={"medium"}
    >
      <TblHead />
      {props.children}
    </MyTable>
  );

  return {
    TblContainer,
  };
}
