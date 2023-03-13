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
import classes from "./tradeMoveSent.module.scss";

export default function SentTile({
  requestStatus,
  requestFrom,
  createdAt,
  requestTo,
  time,
  id,
  setShowtradeOffModal,
  getTradeMoveRequestDetailHandler,
}) {
  let req = `You sent you a trade proposal request to ${tooltipTrim(
    requestTo,
    20
  )}`;

  const showTradeofHandler = () => {
    getTradeMoveRequestDetailHandler(id);
    setShowtradeOffModal(true);
  };

  return (
    <>
      <Box className={classes.sentTeamRoot}>
        <Grid container>
          <Grid item md={10}>
            <Typography className={classes.sentteamTileTitle}>
              {tooltipTrim(req, 74)}
            </Typography>
            <Box className={classes.sentDatetime}>
              {dateTimeFormate(createdAt) + " - " + time}
            </Box>
          </Grid>
          <Grid item md={2} className={classes.sentIcons}>
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
