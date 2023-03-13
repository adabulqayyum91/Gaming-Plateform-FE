import React from "react";
import {
  Checkbox,
  Grid,
  IconButton,
  InputBase,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Toolbar,
  Box,
  Collapse,
} from "@mui/material";
import { Search as SearchIcon, Add } from "@mui/icons-material";
import { styled } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./useNestedTable.module.scss";

const MyTable = styled(Table)({
  color: "white",
  "& .MuiTableCell-root": {
    color: "white",
    padding: "10px 0px",
  },
  "& .MuiCheckbox-root": {
    color: "white",
  },
  "& .MuiTablePagination-root": {
    display: "none",
  },
});

const MyNestedTable = styled(Table)({
  color: "white",
  "& .MuiTableCell-root": {
    color: "white",
    padding: "10px 0px",
  },
  "& .MuiCheckbox-root": {
    color: "white",
  },
});

export default function useNestedTable(record, headCells) {
  const TblHead = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props;
    return (
      <TableHead style={{ background: "#1A1A1A" }}>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>

          {headCells.map((headCell, i) => (
            <TableCell key={i} align={headCell.numeric ? "center" : "left"}>
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };
  const TblToolbar = (props) => {
    const {
      numSelected,
      setAddModal,
      setDeleteModal,
      searchHandler,
      value,
      toolbarType,
      placeholder,
    } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          paddingY: "30px",
          backgroundColor: "#373737",
        }}
      >
        <Grid justify="space-between" container spacing={24}>
          <Grid item>
            <InputBase
              placeholder={placeholder ? placeholder : "Search here"}
              classes={{
                root: classes.usetableInput,
                input: classes.inputBaseInput,
              }}
              autoFocus={true}
              value={value}
              onChange={(val) => searchHandler(val.target.value)}
              endAdornment={<SearchIcon />}
            />
          </Grid>
          <Grid item style={{ marginLeft: "auto" }}>
            {toolbarType !== "result" && (
              <IconButton onClick={() => setAddModal(true)}>
                <Add
                  sx={{
                    color: "",
                    background: "#a19e9e",
                    borderRadius: "2px",
                  }}
                />
              </IconButton>
            )}
            <IconButton onClick={() => setDeleteModal(true)}>
              <DeleteIcon
                sx={{
                  color: "#DF4646",
                  background: "#a19e9e",
                  borderRadius: "2px",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };
  const TblRow = (props) => (
    <MyTable
      sx={{ minWidth: 750 }}
      aria-labelledby="tableTitle"
      size={"medium"}
    >
      {props.children}
    </MyTable>
  );
  const TblContainer = (props) => (
    <MyTable
      sx={{ minWidth: 750 }}
      aria-labelledby="tableTitle"
      size={"medium"}
    >
      {props.children}
    </MyTable>
  );

  const NestedTblBody = (props) => {
    return <TableBody>{props.children}</TableBody>;
  };
  const ComponentContainer = ({ children }) => {
    return (
      <Box sx={{ width: "92%", margin: "auto", marginY: "2%" }}>{children}</Box>
    );
  };
  const NestedTbl = ({ open, nestedColumnCells, children }) => {
    return (
      <TableRow sx={{ width: "100%", backgroundColor: "rgb(26, 26, 26)" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <MyNestedTable aria-labelledby="tableTitle" size={"large"}>
              <TableHead style={{ background: "#1A1A1A" }}>
                <TableRow>
                  {nestedColumnCells.map((headCell) => (
                    <TableCell key={headCell.id} align={"center"}>
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {children}
            </MyNestedTable>
          </Collapse>
        </TableCell>
      </TableRow>
    );
  };

  return {
    TblHead,
    TblToolbar,
    TblContainer,
    NestedTbl,
    NestedTblBody,
    MyNestedTable,
    ComponentContainer,
  };
}
