import * as React from "react";
import { useState, useEffect } from "react";

import { TableBody, Paper, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  updateFranchiseLeaguesResult,
  deleteFranchiseLeaguesResult,
  getFranchiseLeaguesResults,
} from "./reducers";
import { headCells } from "./components/tblColumns";
import DeleteModal from "../../components/DeleteModal/deletemodal";
import MyTblRow from "./components/myTblRow";
import useTable from "../../components/UseTable/useTable";
import GeneralText from "../../../User/components/generalText/generalText";

export default function LeagueResults() {
  const [deleteModel, setDeleteModal] = useState(false);
  const [searchedVal, setSearchedVal] = useState("");
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  const { leaguesResults } = useSelector((state) => state.gpLeagueResults);
  const data = leaguesResults?.data;
  let pageCpy = leaguesResults?.page;

  const { TblContainer, TblHead, TblToolbar, ComponentContainer, Pagination } =
    useTable(data, headCells);

  useEffect(() => {
    window.scroll(window.scrollX, window.scrollY);
  });
  useEffect(() => {
    dispatch(getFranchiseLeaguesResults({ query: "" }));
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
    dispatch(getFranchiseLeaguesResults({ query: "", pageNo: ++newPageCpy }));
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const confirmDeleteHandler = () => {
    let delObj = [];
    data?.map((e, i) => {
      selected.includes(e._id) ? delObj.push(e._id.toString()) : "";
    });
    dispatch(deleteFranchiseLeaguesResult({ resultId: delObj }));
    setDeleteModal(false);
    setSelected([]);
  };
  const searchHandler = (val) => {
    setSearchedVal(val);
    dispatch(getFranchiseLeaguesResults({ query: val }));
  };
  const updaloadResultHandler = (val) => {
    dispatch(updateFranchiseLeaguesResult(val));
  };

  return (
    <ComponentContainer>
      <DeleteModal
        open={deleteModel}
        handleClose={setDeleteModal}
        confirmDeleteHandler={confirmDeleteHandler}
      />
      <Typography sx={{ fontWeight: "bold", color: "white", mt: 2, mb: 2 }}>
        GP League Results
      </Typography>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TblToolbar
          numSelected={selected.length}
          setAddModal={() => setAddLeague(true)}
          setDeleteModal={setDeleteModal}
          searchHandler={searchHandler}
          value={searchedVal}
          placeholder="'League result' search"
          deleteIcon={true}
          toolbarType="result"
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
                    winlossHanlder={updaloadResultHandler}
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
            <GeneralText text="No Leagues Results Found!" />
          </Grid>
        )}
        <Pagination
          page={--pageCpy}
          data={leaguesResults?.total}
          handleChangePage={handleChangePage}
        />
      </Paper>
    </ComponentContainer>
  );
}
