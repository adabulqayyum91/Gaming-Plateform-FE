import React from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/styles";

import classes from "./useTable.module.scss";

const rowsPerPage = 10;

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

export default function UseTable(record, headCells) {
  const TblHead = (props) => {
    return (
      <TableHead style={{ background: "#1A1A1A" }}>
        <TableRow className={classes.headRow}>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "center" : "left"}
              style={{ borderBottom: "none" }}
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
  const ComponentContainer = ({ children }) => {
    return <Box sx={{ width: "100%" }}>{children}</Box>;
  };
  const UserPagination = ({ page, data, handleChangePage }) => {
    return (
      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={data || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    );
  };

  return {
    TblContainer,
    UserPagination,
    ComponentContainer,
  };
}
