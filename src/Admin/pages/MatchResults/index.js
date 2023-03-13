import * as React from "react";
import { useState, useEffect } from "react";

import {
  Grid,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import DeleteModal from "../../components/DeleteModal/deletemodal";
import { getMatchesResults, deleteMatchesResult } from "./reducers";
import { headCells } from "./components/tableColumns";
import useNestedTable from "../../components/UseNestedTable/useNestedTable";
import MyTblRow from "./components/myTblRow";
import GeneralText from "../../../User/components/generalText/generalText";
import useTable from "../../components/UseTable/useTable";

export default function MatchesResults() {
  const [deleteModel, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [searchedVal, setSearchedVal] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { matchesResults } = useSelector((state) => state.matchesResults);
  const { data, total, page } = matchesResults;
  const { TblContainer, TblHead, TblToolbar, ComponentContainer } =
    useNestedTable(data, headCells);
  const { Pagination } = useTable(data, headCells);

  let pageCpy = page;

  useEffect(() => {
    dispatch(getMatchesResults({ query: "" }));
  }, []);
  useEffect(() => {
    window.scroll(window.scrollX, window.scrollY);
  });

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n._id);
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
    dispatch(getMatchesResults({ query: "", pageNo: ++newPageCpy }));
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const confirmDeleteHandler = () => {
    let delObj = [];
    data.map((e, i) => {
      selected.includes(e._id) ? delObj.push(e._id.toString()) : "";
    });
    dispatch(deleteMatchesResult({ resultId: delObj }));
    setDeleteModal(false);
    setSelected([]);
  };
  const searchHandler = (val) => {
    setSearchedVal(val);
    dispatch(getMatchesResults({ query: val }));
  };

  return (
    <ComponentContainer>
      <Typography sx={{ fontWeight: "bold", color: "white", mt: 2, mb: 2 }}>
        Matches Results
      </Typography>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TblToolbar
          numSelected={selected.length}
          setDeleteModal={setDeleteModal}
          searchHandler={searchHandler}
          value={searchedVal}
          toolbarType="result"
          placeholder="'Match' search"
          deleteIcon={true}
        />
        {data?.length ? (
          <TblContainer>
            <TblHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data?.length}
            />
            <TableBody>
              {data &&
                data.map((row, index) => {
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
            <GeneralText text="No Match Results Found!" />
          </Grid>
        )}
        <TablePagination
          style={{ display: "none" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
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
