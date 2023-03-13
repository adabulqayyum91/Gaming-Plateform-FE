import * as React from "react";
import { useState, useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
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
import AddEditModal from "./components/AddEditModal/addEditModal";
import EditModal from "./components/AddEditModal/editModal";
import {
  getTournaments,
  createTournament,
  deleteTournament,
  updateTournament,
  exportData,
} from "./reducers";
import {
  allWordsCapitalize,
  dateTimeFormate,
  tooltipTrim,
} from "../../../utils/apiutils";
import { getGames } from "../Games/reducers";
import { headCells } from "./components/tableColumns";
import useTable from "../../components/UseTable/useTable";
import GeneralText from "../../../User/components/generalText/generalText";
import ExportData from "../../components/ExportData/exportData";
import FilterBar from "../../../User/components/platformTypeBar/platformTypeBar";
import { capitalize } from "../../../utils/apisauce";

const Types = ["All", "General", "Grand Prix"];
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function EnhancedTable() {
  const [filter, setFilter] = useState("All");
  const [searchedVal, setSearchedVal] = useState("");
  const [deleteModel, setDeleteModal] = React.useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const tournaments = useSelector((state) => state.tournaments);
  const games = useSelector((state) => state.games);
  const { data, total, page: pageNo } = tournaments.tournaments;
  const { exporturl } = tournaments;
  const { TblContainer, TblHead, TblToolbar, ComponentContainer, Pagination } =
    useTable(data, headCells);

  let pageCpy = pageNo;

  useEffect(() => {
    dispatch(getTournaments({ query: "" }));
    dispatch(getGames({ query: "" }));
    dispatch(getGames({ query: "" }));
  }, []);
  useEffect(() => {
    window.scroll(window.scrollX, window.scrollY);
  });

  const handleCreateTournament = (values) => {
    setAddModal((val) => !val);
    dispatch(createTournament(values));
  };
  const handleEditTournament = (values) => {
    setEditModal((val) => !val);
    dispatch(updateTournament(values));
    setSelected([]);
  };
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
    dispatch(getTournaments({ query: "", pageNo: ++newPageCpy }));
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const confirmDeleteHandler = () => {
    let delObj = [];
    data?.map((e, i) => {
      selected.includes(e._id) ? delObj.push(e._id.toString()) : "";
    });
    dispatch(deleteTournament({ tournamentId: delObj }));
    setDeleteModal(false);
    setSelected([]);
  };
  const editClickHandler = (row) => {
    setFormData({
      _id: row._id,
      tournamentTitleImage: BASE_URL + "/" + row.tournamentTitleImage,
      tournamentName: row.tournamentName,
      gameToPlay: row.gameToPlay?._id,
      entryFee: row.entryFee,
      prize: row.prize,
      teamSize: row.teamSize,
      tournamentType: capitalize(row.tournamentType),
      totalTeams: row.totalTeams,
      startingDateAndTime: row.startingDateAndTime,
    });
    setEditModal(true);
  };

  const searchHandler = (val) => {
    setSearchedVal(val);
    dispatch(getTournaments({ query: val }));
  };
  const deleteModalHandler = (event, id) => {
    setDeleteModal(true);
    handleClick(event, id);
  };
  const exporthandler = () => {
    dispatch(exportData());
  };

  const generalTours = data?.filter((x) => x.tournamentType === null);
  const gpTours = data?.filter((x) => x.tournamentType !== null);
  const _data =
    filter === "General"
      ? generalTours
      : filter === "Grand Prix"
      ? gpTours
      : data;

  return (
    <ComponentContainer>
      <DeleteModal
        open={deleteModel}
        handleClose={setDeleteModal}
        confirmDeleteHandler={confirmDeleteHandler}
      />
      <AddEditModal
        open={addModal}
        games={games?.games?.data}
        formData={formData}
        handleClose={setAddModal}
        handleCreateTournament={handleCreateTournament}
      />
      <EditModal
        open={editModal}
        games={games?.games?.data}
        formDataObj={formData}
        handleClose={setEditModal}
        handleEditTournament={handleEditTournament}
      />
      <Grid className="far-apart-center">
        <Typography sx={{ fontWeight: "bold", color: "white", mt: 2, mb: 2 }}>
          Tournaments
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
          setAddModal={setAddModal}
          setDeleteModal={setDeleteModal}
          searchHandler={searchHandler}
          value={searchedVal}
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
              {_data?.map((row, index) => {
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
                      {tooltipTrim(row?.tournamentName, 20)}
                    </TableCell>
                    <TableCell align="center">
                      {row?.tournamentType == "general"
                        ? "General"
                        : "Grand Prix"}
                    </TableCell>
                    <TableCell align="center">
                      {allWordsCapitalize(row?.gameToPlay?.gameName)}
                    </TableCell>
                    <TableCell align="center">
                      <PhotoProvider>
                        <PhotoView
                          src={BASE_URL + "/" + row.tournamentTitleImage}
                        >
                          <img
                            src={BASE_URL + "/" + row.tournamentTitleImage}
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
                      {dateTimeFormate(row.startingDateAndTime)}
                    </TableCell>
                    <TableCell align="center">
                      <>
                        <IconButton onClick={() => editClickHandler(row)}>
                          <EditIcon style={{ color: "#90caf9" }} />
                        </IconButton>
                        <IconButton
                          onClick={(e) => deleteModalHandler(e, row._id)}
                        >
                          <DeleteIcon style={{ color: "#DF4646" }} />
                        </IconButton>
                      </>
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
            <GeneralText text="No Tournaments Found!" />
          </Grid>
        )}
        <Pagination
          page={--pageCpy}
          data={_data?.length}
          handleChangePage={handleChangePage}
        />
      </Paper>
    </ComponentContainer>
  );
}
