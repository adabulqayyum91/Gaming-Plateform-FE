import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { IconButton, Typography } from "@mui/material";

import classes from "./exportData.module.scss";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function ExportData({ exporthandler, exporturl }) {
  return (
    <>
      {!exporturl && (
        <IconButton onClick={exporthandler}>
          <Typography variant="span" className={classes.exportDataText}>
            Export Data
          </Typography>
          <FileDownloadIcon
            style={{
              color: "#F26826",
              fontSize: "20px",
            }}
          />
        </IconButton>
      )}
      <br />
      {exporturl && (
        <a
          href={BASE_URL + exporturl}
          target="_blank"
          download
          className={classes.downloadButton}
        >
          Download
        </a>
      )}
    </>
  );
}
