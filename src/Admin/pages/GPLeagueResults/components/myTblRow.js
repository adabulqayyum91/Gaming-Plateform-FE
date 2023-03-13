import React, { useState } from "react";
import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

import { isImage, tooltipTrim } from "../../../../utils/apiutils";
import { capitalize } from "../../../../utils/apisauce";
// import StatusModal from "../../../../../Admin/components/DeleteModal/deletemodal";
import classes from "../index.module.scss";
import KillPointsModal from "./KillPointsModal/killPointsModal";
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
}) => {
  const [eyeValue, setEyeValue] = useState(true);
  const [winlossStatus, setWinlossStatus] = useState({
    open: false,
    killOpen: false,
    status: "",
    row: {},
  });

  return (
    <>
      <KillPointsModal
        row={winlossStatus?.row}
        resultStatus={winlossStatus.resultStatus}
        open={winlossStatus.killOpen}
        handleClose={() =>
          setWinlossStatus({ ...winlossStatus, killOpen: false })
        }
        handleUploadResult={winlossHanlder}
      />
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
          {tooltipTrim(row.leagueName, 20)}
        </TableCell>
        <TableCell align="center">{capitalize(row.gameName)}</TableCell>
        <TableCell align="center">{capitalize(row.teamViewName)}</TableCell>
        <TableCell align="center">{tooltipTrim(row.score, 20)}</TableCell>
        <TableCell align="center">
          {isImage(BASE_URL + row.resultVideo) ? (
            <PhotoViewer url={row?.resultVideo} />
          ) : (
            <VideoViewer videoUrl={row?.resultVideo} />
          )}
        </TableCell>
        <TableCell align="center">{row?.total ?? "--"}</TableCell>
        <TableCell align="center">
          {(row.result === "win" ||
            row.result === "pending" ||
            eyeValue === false) && (
            <Typography
              className={classes.winlossButtons}
              sx={{ background: "#156502" }}
              variant="span"
              onClick={() =>
                setWinlossStatus({
                  row: row,
                  resultStatus: "win",
                  modal: true,
                  killOpen: true,
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
                  row: row,
                  resultStatus: "loss",
                  modal: true,
                  killOpen: true,
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
    </>
  );
};

export default MyTblRow;
