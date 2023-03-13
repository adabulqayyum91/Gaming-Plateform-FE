import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { capitalize } from "../../../../../utils/apisauce";
import { dateTimeFormate, tooltipTrim } from "../../../../../utils/apiutils";
import classes from "./sent.module.scss";
import { useDispatch } from "react-redux";
import { setNavText } from "../../../../layout/header/reducers";

export default function SentTile({
  requestDetail,
  requestFrom,
  requestTo,
  requestType,
  createdAt,
  flId,
  time,
}) {
  const dispatch = useDispatch();

  let req = "You have sent a " + requestType + " to " + requestTo;

  const notifClickHandler = () => {
    dispatch(setNavText("Fantasy League"));
  };
  return (
    <Box className={classes.teamRoot}>
      <Grid container>
        <Grid item md={10}>
          <Typography className={classes.teamTileTitle}>
            {tooltipTrim(req, 65)}
          </Typography>
          <Box className={classes.datetime}>
            {dateTimeFormate(createdAt) + " - " + time}
          </Box>
        </Grid>
        <Grid item md={2}>
          {requestType !== "trade move" ? (
            <Typography
              component="span"
              sx={{
                color:
                  requestDetail == "accepted"
                    ? "#77F226"
                    : requestDetail == "cancelled" || requestDetail == "expired"
                    ? "#D50C0C"
                    : "#767676",
              }}
            >
              {capitalize(requestDetail)}
            </Typography>
          ) : (
            <Link
              to={`/user/fantasy-leagues/${flId}`}
              onClick={notifClickHandler}
            >
              <VisibilityIcon style={{ color: "#A4A4A4" }} />
            </Link>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
