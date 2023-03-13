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
  Toolbar,
  TablePagination,
} from "@mui/material";
import { Search as SearchIcon, Add } from "@mui/icons-material";
import { styled } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./franchiseResultsTable.module.scss";

const rowsPerPage = 10;

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

export default function FranchiseResultsTable(record, headCells) {
  const TblHead = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props;
    return (
      <TableHead style={{ background: "#BC5523" }}>
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
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "center" : "left"}
            >
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
      deleteIcon,
    } = props;

    return (
      <Toolbar
        sx={{
          paddingY: "10px",
          backgroundColor: "#1A1A1A",
          borderRadius: "4px",
        }}
      >
        <Grid justify="space-between" container>
          <Grid item>
            <InputBase
              placeholder={placeholder ? placeholder : "Search here"}
              className={classes.inputBaseRoot}
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
              {deleteIcon && (
                <DeleteIcon
                  sx={{
                    color: "#DF4646",
                    background: "#a19e9e",
                    borderRadius: "2px",
                  }}
                />
              )}
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  const TblContainer = (props) => (
    <MyTable
      sx={{ minWidth: 750 }}
      aria-labelledby="tableTitle"
      size={"medium"}
    >
      {props.children}
    </MyTable>
  );
  const UserFranchisePagination = ({ page, data, handleChangePage }) => {
    return (
      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    );
  };

  return {
    TblHead,
    TblToolbar,
    TblContainer,
    UserFranchisePagination,
  };
}
