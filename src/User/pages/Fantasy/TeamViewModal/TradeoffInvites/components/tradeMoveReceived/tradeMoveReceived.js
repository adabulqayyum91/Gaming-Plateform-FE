import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import acceptImg from "../../../../../../../assets/Mask Group 285.svg";
import declineImg from "../../../../../../../assets/Mask Group 286.svg";
import { capitalize } from "../../../../../../../utils/apisauce";
import {
  dateTimeFormate,
  tooltipTrim,
} from "../../../../../../../utils/apiutils";
import classes from "./tradeMoveReceived.module.scss";

export default function ReceivedTile({
  requestStatus,
  requestFrom,
  createdAt,
  time,
  id,
  setShowtradeOffModal,
  getTradeMoveRequestDetailHandler,
}) {
  let req = `${tooltipTrim(requestFrom, 20)} sent you a trade proposal request`;

  const showTradeofHandler = () => {
    getTradeMoveRequestDetailHandler(id);
    setShowtradeOffModal(true);
  };

  return (
    <>
      <Box className={classes.receivedTeamRoot}>
        <Grid container>
          <Grid item md={10}>
            <Typography className={classes.receivedteamTileTitle}>
              {tooltipTrim(req, 74)}
            </Typography>
            <Box className={classes.receivedDatetime}>
              {dateTimeFormate(createdAt) + " - " + time}
            </Box>
          </Grid>
          <Grid item md={2} className={classes.receivedIcons}>
            <Typography
              component="span"
              sx={{
                color:
                  requestStatus == "accepted"
                    ? "#77F226"
                    : requestStatus == "rejected"
                    ? "#D50C0C"
                    : "#A4A4A4",
              }}
            >
              {capitalize(requestStatus)}
            </Typography>
            <IconButton onClick={() => showTradeofHandler()}>
              <VisibilityIcon style={{ color: "#A4A4A4" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
