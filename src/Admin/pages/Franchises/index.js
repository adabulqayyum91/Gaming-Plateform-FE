import * as React from "react";
import { useState, useEffect } from "react";

import { TableBody, Paper, Typography, Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  getFranchises,
  franchiseApprovalAndBlock,
  exportData,
} from "./reducers";
import DeleteModal from "../../components/DeleteModal/deletemodal";
import { headCells } from "./components/tableColumns";
import useTable from "../../components/UseTable/useTable";
import MyTblRow from "./components/myTblRow";
import GeneralText from "../../../User/components/generalText/generalText";
import ExportData from "../../components/ExportData/exportData";

export default function Franchises() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [approveBlockValues, setApproveBlockValues] = useState({});
  const [searchedVal, setSearchedVal] = useState("");
  const [selected, setSelected] = useState([]);

  const dispatch = useDispatch();
  const { franchises, exporturl } = useSelector(
    (state) => state.adminFranchises
  );
  const { data, total, page } = franchises;
  const { TblContainer, TblHead, TblToolbar, ComponentContainer, Pagination } =
    useTable(data, headCells);

  let pageCpy = page;

  useEffect(() => {
    dispatch(getFranchises({ query: "" }));
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
    dispatch(getFranchises({ query: "", pageNo: ++newPageCpy }));
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const searchHandler = (val) => {
    setSearchedVal(val);
    dispatch(getFranchises({ query: val }));
  };
  const approveDisaproveHanlder = () => {
    dispatch(franchiseApprovalAndBlock(approveBlockValues));
    setDeleteModal(false);
    setApproveBlockValues({});
  };
  const approveDisaproveModalHandler = (values) => {
    setDeleteModal(true);
    setApproveBlockValues(values);
  };
  const exporthandler = () => {
    dispatch(exportData());
  };

  return (
    <ComponentContainer>
      <Grid className="far-apart-center">
        <Typography sx={{ fontWeight: "bold", color: "white", mt: 2, mb: 2 }}>
          Grand Prix
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
          placeholder="'Grand Prix' search"
          deleteIcon={false}
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
                    approveDisaproveModalHandler={approveDisaproveModalHandler}
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
            <GeneralText text="No Grand Prix Found!" />
          </Grid>
        )}
        <Pagination
          page={--pageCpy}
          data={total}
          handleChangePage={handleChangePage}
        />
      </Paper>
      <DeleteModal
        open={deleteModal}
        handleClose={setDeleteModal}
        confirmDeleteHandler={approveDisaproveHanlder}
      />
    </ComponentContainer>
  );
}
