import React, { useState } from "react";
import {
  Checkbox,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/styles";
import { useDispatch } from "react-redux";

import VideoViewer from "../../../../common/videoViewer/videoViewer";
import PhotoViewer from "../../../../common/photoViewer/photoViewer";
import { nestedColumnCells } from "./tableColumns";
import StatusModal from "./StatusModal";
import {
  allWordsCapitalize,
  isImage,
  tooltipTrim,
} from "../../../../utils/apiutils";
import { submitResult } from "../reducers";
import classes from "../index.module.scss";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const MyNestedTable = styled(Table)({
  color: "white",
  "& .MuiTableCell-root": {
    color: "white",
    padding: "10px 0px",
  },
  "& .MuiCheckbox-root": {
    color: "white",
  },
});

const MyTblRow = ({
  row,
  index,
  labelId,
  isItemSelected,
  handleClick,
  setDeleteModal,
}) => {
  const [open, setOpen] = useState();
  const [winlossStatus, setWinlossStatus] = useState({
    open: false,
    status: "",
    id: 0,
    userId: 0,
  });
  const dispatch = useDispatch();
  const winlossStatusHandler = () => {
    let { id, status, userId } = winlossStatus;
    dispatch(
      submitResult({ resultId: id, userId: userId, resultStatus: status })
    );
    setWinlossStatus({ open: false, status: "", id: 0, userId: 0 });
  };
  const statusModalCloseHandler = () => {
    setWinlossStatus({ open: false, status: "", id: 0, userId: 0 });
  };
  const deleteHandler = (event, id) => {
    setDeleteModal(true);
    handleClick(event, id);
  };
  return (
    <>
      <TableRow
        hover
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
            onClick={(event) => handleClick(event, row._id)}
            role="checkbox"
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} Click
            Me
          </IconButton>
        </TableCell>

        <TableCell align="left">{tooltipTrim(row?.matchName, 20)}</TableCell>
        <TableCell align="center">{row.gameToPlay}</TableCell>
        <TableCell align="center">
          {allWordsCapitalize(row.winner?.userDetail?.userName ?? "Pending")}
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={(e) => deleteHandler(e, row._id)}>
            <DeleteIcon style={{ color: "#DF4646" }} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow sx={{ width: "100%", backgroundColor: "rgb(26, 26, 26)" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <MyNestedTable aria-labelledby="tableTitle" size={"large"}>
              <TableHead style={{ background: "#1A1A1A" }}>
                <TableRow>
                  {nestedColumnCells.map((headCell, i) => (
                    <TableCell key={i} align={"center"}>
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {row?.results?.map((result, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align="center">
                        {allWordsCapitalize(result?.playerName)}
                      </TableCell>
                      <TableCell align="center">{result?.score}</TableCell>
                      <TableCell align="center">
                        {isImage(BASE_URL + result.resultVideo) ? (
                          <PhotoViewer url={result?.resultVideo} />
                        ) : (
                          <VideoViewer videoUrl={result?.resultVideo} />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {(result.result === "win" ||
                          result.result === "pending") && (
                          <Typography
                            className={classes.winlossButtons}
                            sx={{
                              background: "#156502",
                              pointerEvents:
                                result.result === "win" ? "none" : "all",
                            }}
                            variant="span"
                            onClick={() =>
                              setWinlossStatus({
                                open: true,
                                status: "win",
                                id: row._id,
                                userId: result.playerId,
                              })
                            }
                          >
                            Win
                          </Typography>
                        )}
                        {(result.result === "loss" ||
                          result.result === "pending") && (
                          <Typography
                            className={classes.winlossButtons}
                            variant="span"
                            sx={{
                              background: "#610000",
                              pointerEvents:
                                result.result === "loss" ? "none" : "all",
                            }}
                            onClick={() =>
                              setWinlossStatus({
                                open: true,
                                status: "loss",
                                id: row._id,
                                userId: result.playerId,
                              })
                            }
                          >
                            Loss
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </MyNestedTable>
          </Collapse>
        </TableCell>
      </TableRow>
      <StatusModal
        open={winlossStatus.open}
        handleClose={statusModalCloseHandler}
        confirmHandler={winlossStatusHandler}
      />
    </>
  );
};

export default MyTblRow;
