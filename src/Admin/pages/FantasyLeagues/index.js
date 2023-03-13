import * as React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  updateFantasyLeague,
  getFantasyLeagues,
  createFantasyLeague,
  deleteFantasyLeague,
  exportData,
} from "./reducers";
import {
  tooltipTrim,
  dateTimeFormate,
  allWordsCapitalize,
} from "../../../utils/apiutils";
import { headCells } from "./components/tableColumns";
import useTable from "../../components/UseTable/useTable";
import EditModal from "./components/AddEditModal/editModal";
import LeagueAddModal from "./components/AddEditModal/addModal";
import ExportData from "../../components/ExportData/exportData";
import DeleteModal from "../../components/DeleteModal/deletemodal";
import GeneralText from "../../../User/components/generalText/generalText";
import { getLeagues } from "../Leagues/reducers";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function EnhancedTable() {
  const [addLeague, setAddLeague] = useState(false);
  const [isDeletedModal, setIsDeletedModal] = React.useState(false);
  const [searchedVal, setSearchedVal] = useState("");
  const [selected, setSelected] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const { leagues } = useSelector((state) => state.adminLeagues);
  const { fantasyLeagues, exporturl } = useSelector(
    (state) => state.adminFantasyLeagues
  );

  const { data, total, page } = fantasyLeagues;
  const { TblContainer, TblHead, TblToolbar, ComponentContainer, Pagination } =
    useTable(data, headCells);

  let pageCpy = page;

  useLayoutEffect(() => {
    dispatch(getLeagues({ query: "" }));
    dispatch(getFantasyLeagues({ query: "" }));
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
    dispatch(getFantasyLeagues({ query: "", pageNo: ++newPageCpy }));
  };
  const handleEditLeague = (values) => {
    dispatch(updateFantasyLeague(values));
    setEditModal((val) => !val);
    setSelected([]);
  };
  const editClickHandler = () => {
    const row = data?.filter((x) => x._id === selected[0])[0];
    setFormData({
      _id: row._id,
      leagueId: row.leagueId,
      flName: row.flName,
      totalTeams: row.totalTeams,
      teamSize: row.teamSize,
      registeredTeams: row.registeredTeams,
      draftDateAndTime: row.draftDateAndTime,
    });
    setEditModal(true);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const searchHandler = (val) => {
    setSearchedVal(val);
    dispatch(getFantasyLeagues({ query: val }));
  };
  const handleCreateLeague = (values) => {
    dispatch(createFantasyLeague(values));
    setAddLeague(false);
  };
  const confirmDeleteHandler = () => {
    let delObj = [];
    data?.map((e, i) => {
      selected.includes(e._id) ? delObj.push(e._id.toString()) : "";
    });
    dispatch(deleteFantasyLeague({ flId: delObj }));
    setIsDeletedModal(false);
    setSelected([]);
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
        leagues={leagues?.data?.length ? leagues?.data : []}
        open={addLeague}
        handleClose={setAddLeague}
        handleCreateFantasyLeague={handleCreateLeague}
      />
      <EditModal
        leagues={leagues?.data?.length ? leagues?.data : []}
        open={editModal}
        formDataObj={formData}
        handleClose={setEditModal}
        handleEditFantasyLeague={handleEditLeague}
      />
      <ComponentContainer>
        <Grid className="far-apart-center">
          <Typography sx={{ fontWeight: "bold", color: "white", mt: 2, mb: 2 }}>
            Fantasy Leagues
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
            placeholder="'Name, GP League' search"
            editObj={{
              edit: selected.length === 1,
              editClickHandler: editClickHandler,
            }}
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
                          {tooltipTrim(row?.flName, 20)}
                        </TableCell>
                        <TableCell align="center">
                          {allWordsCapitalize(row.leagueName)}
                        </TableCell>
                        <TableCell align="center">
                          {allWordsCapitalize(row.type)}
                        </TableCell>
                        <TableCell align="center">{row.year}</TableCell>
                        <TableCell align="center">{row.totalTeams}</TableCell>
                        <TableCell align="center">{row.teamSize}</TableCell>
                        <TableCell align="center">
                          {dateTimeFormate(row.draftDateAndTime)}
                        </TableCell>
                        <TableCell align="center">
                          {row.winner ?? "--"}
                        </TableCell>
                        {/* <TableCell align="center">
                          <IconButton onClick={() => editClickHandler(row)}>
                            <EditIcon style={{ color: "#90caf9" }} />
                          </IconButton>
                          <IconButton
                            onClick={(e) => deleteModalHandler(e, row._id)}
                          >
                            <DeleteIcon style={{ color: "#DF4646" }} />
                          </IconButton>
                        </TableCell> */}
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
