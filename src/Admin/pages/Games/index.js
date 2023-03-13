import * as React from "react";
import { useState, useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

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
import { getGames, createGame, deleteGame, updateGame } from "./reducers";
import { dateTimeFormate, tooltipTrim } from "../../../utils/apiutils";
import { headCells } from "./components/tableColumns";
import useTable from "../../components/UseTable/useTable";
import GeneralText from "../../../User/components/generalText/generalText";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function EnhancedTable() {
  const [searchedVal, setSearchedVal] = useState("");
  const [deleteModel, setDeleteModal] = React.useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const { data, total, page } = games.games;
  const { TblContainer, TblHead, TblToolbar, ComponentContainer, Pagination } =
    useTable(data, headCells);

  let pageCpy = page;

  useEffect(() => {
    dispatch(getGames({ query: "" }));
  }, []);
  useEffect(() => {
    window.scroll(window.scrollX, window.scrollY);
  });

  const handleCreateGame = (values) => {
    dispatch(createGame(values));
    setAddModal((val) => !val);
  };
  const handleEditGame = (values) => {
    setEditModal((val) => !val);
    dispatch(updateGame(values));
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
    dispatch(getGames({ query: "", pageNo: ++newPageCpy }));
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const confirmDeleteHandler = () => {
    let delObj = [];
    data?.map((e, i) => {
      selected.includes(e._id) ? delObj.push(e._id.toString()) : "";
    });
    dispatch(deleteGame({ ids: delObj }));
    setDeleteModal(false);
    setSelected([]);
  };
  const editClickHandler = (row) => {
    let ptforms = [];
    for (let i of row.platforms) {
      ptforms.push(i.toUpperCase());
    }
    setFormData({
      _id: row._id,
      gameImage: BASE_URL + "/" + row.gameImage,
      gameName: row.gameName,
      platforms: ptforms,
      gameType: row.gameType,
    });
    setEditModal(true);
  };
  const searchHandler = (val) => {
    setSearchedVal(val);
    dispatch(getGames({ query: val }));
  };
  const deleteModalHandler = (event, id) => {
    setDeleteModal(true);
    handleClick(event, id);
  };

  return (
    <ComponentContainer>
      <Typography sx={{ fontWeight: "bold", color: "white", mt: 2, mb: 2 }}>
        Games
      </Typography>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TblToolbar
          numSelected={selected.length}
          setAddModal={setAddModal}
          setDeleteModal={setDeleteModal}
          searchHandler={searchHandler}
          value={searchedVal}
          placeholder="'Game' search"
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
                data?.map((row, index) => {
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
                      <TableCell id={labelId} align="left">
                        {tooltipTrim(row?.gameName, 20)}
                      </TableCell>
                      <TableCell align="center">
                        {tooltipTrim(row?.gameType, 15)}
                      </TableCell>
                      <TableCell align="center">
                        <PhotoProvider>
                          <PhotoView src={BASE_URL + "/" + row.gameImage}>
                            <img
                              src={BASE_URL + "/" + row.gameImage}
                              style={{ objectFit: "cover" }}
                              height="35px"
                              width="35px"
                            />
                          </PhotoView>
                        </PhotoProvider>
                      </TableCell>
                      <TableCell align="center">
                        {row.platforms.map((x, i) => {
                          return i !== row.platforms.length - 1
                            ? x.toUpperCase() + ", "
                            : x.toUpperCase();
                        })}
                      </TableCell>
                      <TableCell align="center">
                        {dateTimeFormate(row.createdDate)}
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
            <GeneralText text="No Games Found!" />
          </Grid>
        )}

        <TablePagination
          style={{ display: "none" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.length}
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
        handleClose={setAddModal}
        handleCreateGame={handleCreateGame}
      />
      <EditModal
        open={editModal}
        games={games?.games?.data}
        formDataObj={formData}
        handleClose={setEditModal}
        handleEditGame={handleEditGame}
      />
    </ComponentContainer>
  );
}
