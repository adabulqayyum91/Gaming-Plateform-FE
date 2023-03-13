import * as React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Box, TableBody, Paper, Grid } from "@mui/material";

import DeleteModal from "../../../../../Admin/components/DeleteModal/deletemodal";

import {
  updateFranchiseTournamentResult,
  deleteFranchiseTournamentsResult,
  getFranchiseTournamentResults,
} from "../reducers";

import { headCells } from "./tblColumns";
import MyTblRow from "./myTblRow";
import FranchiseResultsTable from "../../../../components/FranchiseResultsTable/franchiseResultsTable";
import classes from "./tournamentResults.module.scss";
import UseTable from "../../../../components/UseTable/useTable";
import GeneralText from "../../../../components/generalText/generalText";

export default function TournamentResults() {
  const [deleteModel, setDeleteModal] = useState(false);
  const [searchedVal, setSearchedVal] = useState("");
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  const { tournamentResults } = useSelector(
    (state) => state.userFranchiseTournaments
  );
  const data = tournamentResults?.data;
  let pageCpy = tournamentResults.page;

  const { TblContainer, TblHead, TblToolbar } = FranchiseResultsTable(
    data,
    headCells
  );
  const { UserPagination } = UseTable();

  useEffect(() => {
    window.scroll(window.scrollX, window.scrollY);
  });
  useEffect(() => {
    dispatch(getFranchiseTournamentResults({ query: "" }));
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data?.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    let newPageCpy = newPage;
    dispatch(
      getFranchiseTournamentResults({ query: "", pageNo: ++newPageCpy })
    );
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const confirmDeleteHandler = () => {
    let delObj = [];
    data?.map((e, i) => {
      selected.includes(e._id) ? delObj.push(e._id.toString()) : "";
    });
    dispatch(deleteFranchiseTournamentsResult({ resultId: delObj }));
    setDeleteModal(false);
    setSelected([]);
  };
  const searchHandler = (val) => {
    setSearchedVal(val);
    dispatch(getFranchiseTournamentResults({ query: val }));
  };
  const winlossHanlder = ({ resultId, resultStatus }) => {
    dispatch(updateFranchiseTournamentResult({ resultId, resultStatus }));
  };

  return (
    <Box className={classes.tblContainer}>
      <Paper sx={{ width: "100%", mb: 2, border: "1px solid #707070" }}>
        <TblToolbar
          numSelected={selected.length}
          setDeleteModal={setDeleteModal}
          searchHandler={searchHandler}
          value={searchedVal}
          toolbarType="result"
          placeholder="'Tournament' search"
          deleteIcon={true}
        />
        {data && data.length ? (
          <TblContainer>
            <TblHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data?.length}
            />
            <TableBody>
              {data?.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <MyTblRow
                    row={row}
                    key={index}
                    index={index}
                    labelId={labelId}
                    handleClick={handleClick}
                    isItemSelected={isItemSelected}
                    setDeleteModal={setDeleteModal}
                    winlossHanlder={winlossHanlder}
                  />
                );
              })}
            </TableBody>
          </TblContainer>
        ) : (
          <Grid
            container
            sx={{ background: "#282828", width: "100%", height: "100px" }}
          >
            <GeneralText text="No Tournaments Found!" />
          </Grid>
        )}
        <UserPagination
          page={--pageCpy}
          data={tournamentResults.total}
          handleChangePage={handleChangePage}
        />
      </Paper>
      <DeleteModal
        open={deleteModel}
        handleClose={setDeleteModal}
        confirmDeleteHandler={confirmDeleteHandler}
      />
    </Box>
  );
}
