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
  Box,
  TablePagination,
} from "@mui/material";
import { Search as SearchIcon, Add, Edit } from "@mui/icons-material";
import { styled } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./useTable.module.scss";

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

export default function useTable(record, headCells) {
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
      setAddModal,
      setDeleteModal,
      searchHandler,
      value,
      toolbarType,
      editObj,
      placeholder,
      deleteIcon,
    } = props;

    return (
      <Toolbar
        sx={{
          paddingY: "30px",
          backgroundColor: "#373737",
        }}
      >
        <Grid justify="space-between" container>
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
            {editObj && (
              <IconButton
                disabled={!editObj.edit}
                onClick={editObj.editClickHandler}
              >
                <Edit
                  sx={{
                    color: "#000000 !important",
                    background: editObj.edit ? "#a19e9e" : "#525151",
                    borderRadius: "2px",
                  }}
                />
              </IconButton>
            )}
            {toolbarType !== "result" && (
              <IconButton onClick={() => setAddModal(true)}>
                <Add
                  sx={{
                    color: "#000000 !important",
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
  const ComponentContainer = ({ children }) => {
    return (
      <Box sx={{ width: "92%", margin: "auto", marginY: "2%" }}>{children}</Box>
    );
  };
  const Pagination = ({ page, data, handleChangePage }) => {
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
  const TblContainer = ({ children }) => (
    <MyTable
      sx={{ minWidth: 750 }}
      aria-labelledby="tableTitle"
      size={"medium"}
    >
      {children}
    </MyTable>
  );

  return {
    TblHead,
    TblToolbar,
    Pagination,
    TblContainer,
    ComponentContainer,
  };
}
