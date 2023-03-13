import React, { useState } from "react";
import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

import { isImage, tooltipTrim } from "../../../../utils/apiutils";
import classes from "../index.module.scss";
import PhotoViewer from "../../../../common/photoViewer/photoViewer";
import VideoViewer from "../../../../common/videoViewer/videoViewer";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

const MyTblRow = ({
  row,
  index,
  labelId,
  isItemSelected,
  handleClick,
  setDeleteModal,
  winlossHanlder,
  deleteModalHandler,
}) => {
  const [eyeValue, setEyeValue] = useState(true);

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
          {tooltipTrim(row.teamId?.teamViewName, 20)}
        </TableCell>
        <TableCell align="center">
          {tooltipTrim(row.gameToPlay?.gameName, 20)}
        </TableCell>
        <TableCell align="center">
          {tooltipTrim(row.tournamentId?.tournamentName, 20)}
        </TableCell>
        <TableCell align="center">{row.score}</TableCell>
        <TableCell align="center">
          {isImage(BASE_URL + row.resultVideo) ? (
            <PhotoViewer url={row?.resultVideo} />
          ) : (
            <VideoViewer videoUrl={row?.resultVideo} />
          )}
        </TableCell>
        <TableCell align="center">
          {(row.result === "win" ||
            row.result === "pending" ||
            eyeValue === false) && (
            <Typography
              className={classes.winlossButtons}
              sx={{ background: "#156502" }}
              variant="span"
              onClick={() => winlossHanlder("win", row._id)}
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
              onClick={() => winlossHanlder("loss", row._id)}
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
        <TableCell align="center">
          <IconButton onClick={(e) => deleteModalHandler(e, row._id)}>
            <DeleteIcon style={{ color: "#DF4646" }} />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default MyTblRow;
