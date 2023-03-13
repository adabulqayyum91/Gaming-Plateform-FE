import * as React from "react";
import { useState, useEffect } from "react";

import {
  Box,
  TableBody,
  TablePagination,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../components/DeleteModal/deletemodal";
import {
  getTournamentsResults,
  submitResult,
  deleteTournamentsResult,
  exportData,
} from "./reducers";
import { headCells } from "./components/tableColumns";
import useTable from "../../components/UseTable/useTable";
import classes from "./index.module.scss";
import GeneralText from "../../../User/components/generalText/generalText";
import ExportData from "../../components/ExportData/exportData";
import FilterBar from "../../../User/components/platformTypeBar/platformTypeBar";
import MyTblRow from "./components/myTblRow";

const Types = ["All", "General", "Grand Prix"];
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function TournamentsResults() {
  const [filter, setFilter] = useState("All");
  const [deleteModel, setDeleteModal] = useState(false);
  const [searchedVal, setSearchedVal] = useState("");
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { tournamentsResults, exporturl } = useSelector(
    (state) => state.tournamentsResults
  );
  const { data, total, page } = tournamentsResults;
  const { TblContainer, TblHead, TblToolbar, ComponentContainer, Pagination } =
    useTable(data, headCells);

  let pageCpy = page;

  useEffect(() => {
    dispatch(getTournamentsResults({ query: "" }));
  }, []);
  useEffect(() => {
    window.scroll(window.scrollX, window.scrollY);
  });

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
    dispatch(getTournamentsResults({ query: "", pageNo: ++newPageCpy }));
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;

  const confirmDeleteHandler = () => {
    let delObj = [];
    data?.map((e, i) => {
      selected.includes(e._id) ? delObj.push(e._id.toString()) : "";
    });
    dispatch(deleteTournamentsResult({ resultId: delObj }));
    setDeleteModal(false);
    setSelected([]);
  };
  const searchHandler = (val) => {
    setSearchedVal(val);
    dispatch(getTournamentsResults({ query: val }));
  };
  const updaloadResultHandler = (val, id) => {
    dispatch(submitResult({ resultId: id, resultStatus: val }));
  };

  const deleteModalHandler = (event, id) => {
    setDeleteModal(true);
    handleClick(event, id);
  };
  const exporthandler = () => {
    dispatch(exportData());
  };

  const generalTours = data?.filter((x) => x.category === "general");
  const gpTours = data?.filter((x) => x.category === "franchise");
  const _data =
    filter === "General"
      ? generalTours
      : filter === "Grand Prix"
      ? gpTours
      : data;

  return (
    <ComponentContainer>
      <Grid className="far-apart-center">
        <Typography sx={{ fontWeight: "bold", color: "white", mt: 2, mb: 2 }}>
          Tournaments Results
          <FilterBar
            types={Types}
            val={filter}
            valHanlder={(val) => setFilter(val)}
          />
        </Typography>
        <Box>
          <ExportData exporturl={exporturl} exporthandler={exporthandler} />
        </Box>
      </Grid>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TblToolbar
          numSelected={selected.length}
          setDeleteModal={setDeleteModal}
          searchHandler={searchHandler}
          value={searchedVal}
          toolbarType="result"
          placeholder="'Tournament' search"
          deleteIcon={true}
        />
        {_data?.length ? (
          <TblContainer>
            <TblHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={_data?.length}
            />
            <TableBody>
              {_data &&
                _data?.map((row, index) => {
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
                      deleteModalHandler={deleteModalHandler}
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
            <GeneralText text="No Tournament Results Found!" />
          </Grid>
        )}
        <TablePagination
          style={{ display: "none" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={_data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Pagination
          data={total}
          page={--pageCpy}
          handleChangePage={handleChangePage}
        />
      </Paper>
      <DeleteModal
        open={deleteModel}
        handleClose={setDeleteModal}
        confirmDeleteHandler={confirmDeleteHandler}
      />
    </ComponentContainer>
  );
}
