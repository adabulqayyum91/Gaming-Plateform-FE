import * as React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useState, useEffect } from "react";
import { Edit as EditIcon } from "@mui/icons-material";
import {
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";

import DeleteModal from "../../components/DeleteModal/deletemodal";
import EditModal from "./components/AddEditModal/editModal";
import {
  createFranchiseLeague,
  deleteFranchiseLeague,
  exportData,
  getLeagues,
  updateLeague,
} from "./reducers";
import {
  allWordsCapitalize,
  dateFormate,
  tooltipTrim,
} from "../../../utils/apiutils";
import { headCells } from "./components/tableColumns";
import useTable from "../../components/UseTable/useTable";
import LeagueAddModal from "./components/AddEditModal/addEditModal";
import GeneralText from "../../../User/components/generalText/generalText";
import { getFranchiseGames } from "../../../User/pages/Franchise/Tournaments/reducers";
import ExportData from "../../components/ExportData/exportData";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function EnhancedTable() {
  const [addLeague, setAddLeague] = useState(false);
  const [isDeletedModal, setIsDeletedModal] = React.useState(false);
  const [searchedVal, setSearchedVal] = useState("");
  const [selected, setSelected] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.userFranchiseTournaments);
  const { leagues, exporturl } = useSelector((state) => state.adminLeagues);

  const { data, total, page } = leagues;
  const { TblContainer, TblHead, TblToolbar, ComponentContainer, Pagination } =
    useTable(data, headCells);

  let pageCpy = page;

  useEffect(() => {
    dispatch(getLeagues({ query: "" }));
    dispatch(getFranchiseGames());
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
    dispatch(getLeagues({ query: "", pageNo: ++newPageCpy }));
  };
  const handleEditLeague = (values) => {
    dispatch(updateLeague(values));
    setEditModal((val) => !val);
    setSelected([]);
  };
  const editClickHandler = (row) => {
    setFormData({
      _id: row._id,
      leagueTitleImage: BASE_URL + "/" + row.leagueTitleImage,
      leagueName: row.leagueName,
      gameToPlay: row.gameToPlay?._id,
      entryFee: row.entryFee,
      prize: row.prize,
      teamSize: row.teamSize,
      totalTeams: row.totalTeams,
      startingDate: row.startingDate,
      endingDate: row.endingDate,
      registeredTeams: row.registeredTeams,
    });
    setEditModal(true);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const searchHandler = (val) => {
    setSearchedVal(val);
    dispatch(getLeagues({ query: val }));
  };
  const handleCreateLeague = (values) => {
    dispatch(createFranchiseLeague(values));
    setAddLeague(false);
  };
  const confirmDeleteHandler = () => {
    let delObj = [];
    data?.map((e, i) => {
      selected.includes(e._id) ? delObj.push(e._id.toString()) : "";
    });
    dispatch(deleteFranchiseLeague({ leagueId: delObj }));
    setIsDeletedModal(false);
    setSelected([]);
  };
  const deleteModalHandler = (event, id) => {
    setIsDeletedModal(true);
    handleClick(event, id);
  };
  const exporthandler = () => {
    dispatch(exportData());
  };
  return (
    <>
      <DeleteModal
        open={isDeletedModal}
        handleClose={() => setIsDeletedModal(false)}
        confirmDeleteHandler={confirmDeleteHandler}
      />
      <LeagueAddModal
        games={games}
        open={addLeague}
        handleClose={setAddLeague}
        handleCreateLeague={handleCreateLeague}
      />
      <EditModal
        games={games}
        open={editModal}
        formDataObj={formData}
        handleClose={setEditModal}
        handleEditLeague={handleEditLeague}
      />
      <ComponentContainer>
        <Grid className="far-apart-center">
          <Typography sx={{ fontWeight: "bold", color: "white", mt: 2, mb: 2 }}>
            GP Leagues
          </Typography>
          <Box>
            <ExportData exporturl={exporturl} exporthandler={exporthandler} />
          </Box>
        </Grid>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TblToolbar
            numSelected={selected.length}
            setAddModal={() => setAddLeague(true)}
            setDeleteModal={setIsDeletedModal}
            searchHandler={searchHandler}
            value={searchedVal}
            placeholder="'League' search"
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
                {data.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <>
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        style={{
                          backgroundColor:
                            index % 2 == 0 ? "#4A4A4A" : "#282828",
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
                          {tooltipTrim(row?.leagueName, 20)}
                        </TableCell>
                        <TableCell align="center">
                          {allWordsCapitalize(row.gameToPlay?.gameName)}
                        </TableCell>
                        <TableCell align="center">
                          <PhotoProvider>
                            <PhotoView
                              src={BASE_URL + "/" + row.leagueTitleImage}
                            >
                              <img
                                src={BASE_URL + "/" + row.leagueTitleImage}
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
                          {dateFormate(row?.startingDate)}
                        </TableCell>
                        <TableCell align="center">
                          {dateFormate(row?.endingDate)}
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
                    </>
                  );
                })}
              </TableBody>
            </TblContainer>
          ) : (
            <Grid
              container
              sx={{ background: "#282828", width: "100%", height: "100px" }}
            >
              <GeneralText text="No Leagues Found!" />
            </Grid>
          )}
          <Pagination
            data={total}
            page={--pageCpy}
            handleChangePage={handleChangePage}
          />
        </Paper>
      </ComponentContainer>
    </>
  );
}
