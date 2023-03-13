import * as React from "react";
import { useState, useEffect } from "react";
import { Edit as EditIcon } from "@mui/icons-material";

import {
  Typography,
  Checkbox,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Box,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import GeneralText from "../../../User/components/generalText/generalText";
import DeleteModal from "../../components/DeleteModal/deletemodal";
import EditModal from "../../components/EditModal/editModal";
import AddModal from "../../components/AddEditModal/addModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  exportData,
} from "./reducers";
import useTable from "../../components/UseTable/useTable";
import { headCells } from "./components/tableData";
import { tooltipTrim } from "../../../utils/apiutils";
import ExportData from "../../components/ExportData/exportData";

export default function EnhancedTable() {
  const [searchedVal, setSearchedVal] = useState("");
  const [deleteModel, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const { data, total, page } = users.users;
  const { exporturl } = users;
  const { TblContainer, TblHead, TblToolbar, ComponentContainer, Pagination } =
    useTable(data, headCells);

  let pageCpy = page;

  useEffect(() => {
    dispatch(getUsers({ query: "" }));
  }, []);
  useEffect(() => {
    window.scroll(window.scrollX, window.scrollY);
  });

  const handleCreateUser = (values) => {
    setAddModal((val) => !val);
    dispatch(createUser(values));
  };
  const handleSelectAllClick = (event) => {
    event.preventDefault();
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    event.preventDefault();
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
    event.preventDefault();
    let newPageCpy = newPage;
    dispatch(getUsers({ query: "", pageNo: ++newPageCpy }));
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const confirmDeleteHandler = () => {
    let delObj = [];
    data.map((e, i) => {
      selected.includes(e._id) ? delObj.push(e.userDetail.email) : "";
    });
    dispatch(deleteUser({ email: delObj }));
    setDeleteModal(false);
    setSelected([]);
  };
  const editClickHandler = (row) => {
    setFormData({
      id: row._id,
      fullName: row.userDetail?.fullName,
      userName: row.userDetail?.userName,
      email: row.userDetail?.email,
      about: row.userDetail?.about,
      credits: row.userDetail?.credits,
    });
    setEditModal(true);
  };
  const handleEditUser = (values) => {
    dispatch(updateUser(values));
    setEditModal(false);
  };
  const searchHandler = (val) => {
    setSearchedVal(val);
    dispatch(getUsers({ query: val }));
  };
  const exporthandler = () => {
    dispatch(exportData());
  };

  return (
    <ComponentContainer>
      <Grid className="far-apart-center">
        <Typography sx={{ fontWeight: "bold", color: "white", mt: 2, mb: 2 }}>
          Users
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
          placeholder="'Username' search"
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
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row._id)}
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
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      {tooltipTrim(row.userDetail?.fullName, 20)}
                    </TableCell>
                    <TableCell align="center">
                      {tooltipTrim(row.userDetail?.userName, 20)}
                    </TableCell>
                    <TableCell align="center">
                      {tooltipTrim(row.userDetail?.email, 20)}
                    </TableCell>
                    <TableCell align="center">
                      {row.userDetail?.credits}
                    </TableCell>
                    <TableCell align="center">{row?.matches ?? "--"}</TableCell>
                    <TableCell align="center">{row?.win ?? "--"}</TableCell>
                    <TableCell align="center">{row?.loss ?? "--"}</TableCell>
                    <TableCell align="center">
                      {row?.winPercentage ?? "--"}
                    </TableCell>
                    <TableCell align="center">
                      {tooltipTrim(row.userDetail?.about, 20)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => editClickHandler(row)}>
                        <EditIcon style={{ color: "#90caf9" }} />
                      </IconButton>
                      <IconButton onClick={() => setDeleteModal(true)}>
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
            <GeneralText text="No Users Found!" />
          </Grid>
        )}
        <Pagination
          page={--pageCpy}
          data={total}
          handleChangePage={handleChangePage}
        />
      </Paper>
      <DeleteModal
        open={deleteModel}
        handleClose={setDeleteModal}
        confirmDeleteHandler={confirmDeleteHandler}
      />
      <AddModal
        open={addModal}
        handleClose={setAddModal}
        handleCreateUser={handleCreateUser}
      />
      <EditModal
        open={editModal}
        formData={formData}
        handleClose={setEditModal}
        handleEditUser={handleEditUser}
      />
    </ComponentContainer>
  );
}
