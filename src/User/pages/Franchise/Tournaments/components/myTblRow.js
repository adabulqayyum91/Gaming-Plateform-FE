import React, { useState } from "react";
import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { isImage, tooltipTrim } from "../../../../../utils/apiutils";
import { capitalize } from "../../../../../utils/apisauce";
import StatusModal from "../../../../../Admin/components/DeleteModal/deletemodal";
import classes from "./tournamentResults.module.scss";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

const MyTblRow = ({
  row,
  index,
  labelId,
  isItemSelected,
  handleClick,
  setDeleteModal,
  winlossHanlder,
}) => {
  const [eyeValue, setEyeValue] = useState(true);
  const [winlossStatus, setWinlossStatus] = useState({
    open: false,
    status: "",
    id: 0,
  });

  const winlossStatusHandler = () => {
    let { id, status } = winlossStatus;
    winlossHanlder({ resultId: id, resultStatus: status });
    setWinlossStatus({ open: false, status: "", id: 0 });
  };
  const statusModalCloseHandler = () => {
    setWinlossStatus({ open: false, status: "", id: 0 });
  };
  const isItImage = isImage(BASE_URL + row.resultVideo);

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
          backgroundColor: "#1A1A1A",
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
        <TableCell id={labelId} scope="row" padding="none">
          {tooltipTrim(row.tournamentName, 20)}
        </TableCell>
        <TableCell align="left">{capitalize(row.gameName)}</TableCell>
        <TableCell align="left">{capitalize(row.teamViewName)}</TableCell>
        <TableCell align="center">{tooltipTrim(row.score, 20)}</TableCell>
        <TableCell align="center">
          {!isItImage ? (
            <video width="35px" height="35px">
              <source src={BASE_URL + row?.resultVideo} type="video/mp4" />
              <source src={BASE_URL + row?.resultVideo} type="video/webm" />
            </video>
          ) : (
            <img
              alt=" "
              width="35px"
              height="35px"
              src={BASE_URL + row?.resultVideo}
            />
          )}
        </TableCell>
        <TableCell align="left">
          {(row.result === "win" ||
            row.result === "pending" ||
            eyeValue === false) && (
            <Typography
              className={classes.winlossButtons}
              sx={{ background: "#156502" }}
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
            row.result === "pending" ||
            eyeValue === false) && (
            <Typography
              className={classes.winlossButtons}
              variant="span"
              sx={{ background: "#610000" }}
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
          {row.result !== "pending" && eyeValue === true && (
            <IconButton onClick={() => setEyeValue(false)}>
              <EditIcon style={{ color: "#A4A4A4" }} />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <StatusModal
        open={winlossStatus.open}
        handleClose={statusModalCloseHandler}
        confirmDeleteHandler={winlossStatusHandler}
      />
    </>
  );
};

export default MyTblRow;
