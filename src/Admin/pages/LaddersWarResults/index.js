import * as React from "react";
import { useState, useEffect } from "react";

import {
  Grid,
  Box,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";

import GeneralText from "../../../User/components/generalText/generalText";
import VideoViewer from "../../../common/videoViewer/videoViewer";
import PhotoViewer from "../../../common/photoViewer/photoViewer";
import DeleteModal from "../../components/DeleteModal/deletemodal";
import StatusModal from "./components/StatusModal";
import {
  getTotalWarLaddersResults,
  submitResult,
  exportData,
  deleteResult,
} from "./reducers";
import { isImage, tooltipTrim } from "../../../utils/apiutils";
import { headCells } from "./components/tableColumns";
import useTable from "../../components/UseTable/useTable";
import classes from "./index.module.scss";
import ExportData from "../../components/ExportData/exportData";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function TotalWarLaddersResults() {
  const [deleteModel, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [searchedVal, setSearchedVal] = useState("");
  const [winlossStatus, setWinlossStatus] = useState({
    open: false,
    status: "",
    id: 0,
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { totalWarLaddersResults, exporturl } = useSelector(
    (state) => state.totalWarLaddersResults
  );
  const { data, total, page } = totalWarLaddersResults;
  const { TblContainer, TblHead, TblToolbar, ComponentContainer, Pagination } =
    useTable(data, headCells);
  let pageCpy = page;

  useEffect(() => {
    dispatch(getTotalWarLaddersResults({ query: "" }));
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

  const handleClick = (e, id) => {
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
    dispatch(getTotalWarLaddersResults({ query: "", pageNo: ++newPageCpy }));
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
    dispatch(deleteResult({ resultId: delObj }));
    setDeleteModal(false);
    setSelected([]);
  };
  const searchHandler = (val) => {
    setSearchedVal(val);
    dispatch(getTotalWarLaddersResults({ query: val }));
  };
  const winlossStatusHandler = () => {
    let id = winlossStatus.id,
      val = winlossStatus.status;
    dispatch(submitResult({ resultId: id, resultStatus: val }));
    setWinlossStatus({ open: false, status: "", id: 0 });
  };
  const statusModalCloseHandler = () => {
    setWinlossStatus({ open: false, status: "", id: 0 });
  };
  const deleteModalHandler = (event, id) => {
    setDeleteModal(true);
    handleClick(event, id);
  };
  const exporthandler = () => {
    dispatch(exportData());
  };

  return (
    <ComponentContainer>
      <Grid className="far-apart-center">
        <Typography sx={{ fontWeight: "bold", color: "white", mt: 2, mb: 2 }}>
          Total War Ladder Results
        </Typography>
        {/* <Box>
          <ExportData exporturl={exporturl} exporthandler={exporthandler} />
        </Box> */}
      </Grid>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TblToolbar
          numSelected={selected.length}
          setDeleteModal={setDeleteModal}
          searchHandler={searchHandler}
          value={searchedVal}
          toolbarType="result"
          placeholder="'Ladder Name' search"
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
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      style={{
                        backgroundColor: index % 2 == 0 ? "#4A4A4A" : "#282828",
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row._id)}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {tooltipTrim(row?.ladderName, 20)}
                      </TableCell>
                      <TableCell align="center">
                        {tooltipTrim(row?.teamViewName, 20)}
                      </TableCell>
                      <TableCell align="center">
                        {tooltipTrim(row.gameName, 20)}
                      </TableCell>
                      <TableCell align="center">
                        {tooltipTrim(row.score, 20)}
                      </TableCell>
                      <TableCell align="center">
                        {isImage(BASE_URL + row.resultVideo) ? (
                          <PhotoViewer url={row?.resultVideo} />
                        ) : (
                          <VideoViewer videoUrl={row?.resultVideo} />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {(row.result === "win" || row.result === "pending") && (
                          <Typography
                            className={classes.winlossButtons}
                            sx={{
                              background: "#156502",
                              pointerEvents:
                                row.result === "win" ? "none" : "all",
                            }}
                            variant="span"
                            onClick={() =>
                              setWinlossStatus({
                                open: true,
                                status: "win",
                                id: row._id,
                              })
                            }
                          >
                            Win
                          </Typography>
                        )}
                        {(row.result === "loss" ||
                          row.result === "pending") && (
                          <Typography
                            className={classes.winlossButtons}
                            variant="span"
                            sx={{
                              background: "#610000",
                              pointerEvents:
                                row.result === "loss" ? "none" : "all",
                            }}
                            onClick={() =>
                              setWinlossStatus({
                                open: true,
                                status: "loss",
                                id: row._id,
                              })
                            }
                          >
                            Loss
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={(e) => deleteModalHandler(e, row._id)}
                        >
                          <DeleteIcon style={{ color: "#DF4646" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </TblContainer>
        ) : (
          <Grid
            container
            sx={{ background: "#282828", width: "100%", height: "100px" }}
          >
            <GeneralText text="No Total War Ladders' Results Found!" />
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
      <StatusModal
        open={winlossStatus.open}
        handleClose={statusModalCloseHandler}
        confirmHandler={winlossStatusHandler}
      />
    </ComponentContainer>
  );
}
