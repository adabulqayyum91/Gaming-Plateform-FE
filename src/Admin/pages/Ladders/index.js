import * as React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useState, useEffect } from "react";
import {
  Edit as EditIcon,
  Search as SearchIcon,
  Add,
} from "@mui/icons-material";
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

import DeleteModal from "../../components/DeleteModal/deletemodal";
import AddEditModal from "./components/AddEditModal/addEditModal";
import EditModal from "./components/AddEditModal/editModal";
import {
  getLadders,
  createLadder,
  deleteLadder,
  updateLadder,
  exportData,
} from "./reducers";
import { dateTimeFormate, tooltipTrim } from "../../../utils/apiutils";
import { getGames, getUserSideGames } from "../Games/reducers";
import { headCells } from "./components/tableColumns";
import useTable from "../../components/UseTable/useTable";
import GeneralText from "../../../User/components/generalText/generalText";
import ExportData from "../../components/ExportData/exportData";
import { capitalize } from "../../../utils/apisauce";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function EnhancedTable() {
  const [deleteModel, setDeleteModal] = React.useState(false);
  const [addModal, setAddModal] = useState(false);
  const [searchedVal, setSearchedVal] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const ladders = useSelector((state) => state.ladders);
  const { userSideGames } = useSelector((state) => state.games);
  const { data, total, page } = ladders.ladders;
  const { exporturl } = ladders;
  const { TblContainer, TblHead, TblToolbar, ComponentContainer, Pagination } =
    useTable(data, headCells);
  let pageCpy = page;

  useEffect(() => {
    dispatch(getLadders({ query: "" }));
    dispatch(getUserSideGames({ query: "" }));
  }, []);
  useEffect(() => {
    window.scroll(window.scrollX, window.scrollY);
  });

  const handleCreateLadder = (values) => {
    setAddModal((val) => !val);
    dispatch(createLadder(values));
  };
  const handleEditLadder = (values) => {
    setEditModal((val) => !val);
    dispatch(updateLadder(values));
    setSelected([]);
  };

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
    dispatch(getLadders({ query: "", pageNo: ++newPageCpy }));
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
    dispatch(deleteLadder({ ids: delObj }));
    setDeleteModal(false);
    setSelected([]);
  };
  const editClickHandler = (row) => {
    setFormData({
      _id: row._id,
      ladderTitleImage: BASE_URL + "/" + row.ladderTitleImage,
      ladderName: row.ladderName,
      gameToPlay: row.gameToPlay,
      entryFee: row.entryFee,
      prize: row.prize,
      teamSize: row.teamSize,
      totalTeams: row.totalTeams,
      ladderType: row.ladderType,
      startingDateAndTime: row.startingDateAndTime,
      endingDateAndTime: row.endingDateAndTime,
    });
    setEditModal(true);
  };
  const searchHandler = (val) => {
    setSearchedVal(val);
    dispatch(getLadders({ query: val }));
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
          Ladders
        </Typography>
        <Box>
          <ExportData exporturl={exporturl} exporthandler={exporthandler} />
        </Box>
      </Grid>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TblToolbar
          numSelected={selected.length}
          setAddModal={setAddModal}
          setDeleteModal={setDeleteModal}
          searchHandler={searchHandler}
          value={searchedVal}
          placeholder="'Ladder' search"
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
                      <TableCell align="left">
                        {tooltipTrim(row?.ladderName, 20)}
                      </TableCell>
                      <TableCell align="center">
                        {userSideGames?.length &&
                          capitalize(
                            userSideGames?.filter(
                              (item) => item._id === row.gameToPlay
                            )[0]?.gameName
                          )}
                      </TableCell>
                      <TableCell align="center">
                        <PhotoProvider>
                          <PhotoView
                            src={BASE_URL + "/" + row.ladderTitleImage}
                          >
                            <img
                              src={BASE_URL + "/" + row.ladderTitleImage}
                              style={{ objectFit: "cover" }}
                              height="35px"
                              width="35px"
                            />
                          </PhotoView>
                        </PhotoProvider>
                      </TableCell>
                      <TableCell align="center">{row.entryFee}</TableCell>
                      <TableCell align="center">{row.prize}</TableCell>
                      <TableCell align="center">{row.teamSize}</TableCell>
                      <TableCell align="center">{row.totalTeams}</TableCell>
                      <TableCell align="center">
                        {capitalize(row.ladderType ?? "--")}
                      </TableCell>
                      <TableCell align="center">
                        {dateTimeFormate(row.startingDateAndTime)}
                      </TableCell>
                      <TableCell align="center">
                        {dateTimeFormate(row.endingDateAndTime)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => editClickHandler(row)}>
                          <EditIcon style={{ color: "#90caf9" }} />
                        </IconButton>
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
            <GeneralText text="No Ladders Found!" />
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
      <AddEditModal
        open={addModal}
        games={userSideGames}
        formData={formData}
        handleClose={setAddModal}
        handleCreateLadder={handleCreateLadder}
      />
      <EditModal
        open={editModal}
        games={userSideGames}
        formDataObj={formData}
        handleClose={setEditModal}
        handleEditLadder={handleEditLadder}
      />
    </ComponentContainer>
  );
}
