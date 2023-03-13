import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import acceptImg from "../../../../../assets/Mask Group 285.svg";
import declineImg from "../../../../../assets/Mask Group 286.svg";
import { capitalize } from "../../../../../utils/apisauce";
import { dateTimeFormate, tooltipTrim } from "../../../../../utils/apiutils";
import classes from "./received.module.scss";
import { Link } from "react-router-dom";
import { setNavText } from "../../../../layout/header/reducers";
import { useDispatch } from "react-redux";

export default function ReceivedTile({
  requestDetail,
  requestFrom,
  fromId,
  requestType,
  createdAt,
  time,
  id,
  requestHandler,
  credits,
  flId = "",
}) {
  const dispatch = useDispatch();
  let req =
    requestType === "team invite"
      ? requestFrom + " has invited you to join his team "
      : requestType === "fl request"
      ? requestFrom + " has invited you to join his Fantasy League "
      : requestType === "trade move"
      ? requestFrom + " sent you a trade request "
      : requestType === "franchise team invite"
      ? requestFrom + " has invited you to join his franchise team "
      : requestType === "friend request"
      ? requestFrom + " sent you a friend request "
      : requestFrom +
          " sent you a match invite (credits to be deducted) -> " +
          credits ?? 0;
  const notifClickHandler = () => {
    dispatch(setNavText("Fantasy League"));
  };
  return (
    <Box className={classes.receivedTeamRoot}>
      <Grid container>
        <Grid item md={10}>
          <Typography className={classes.receivedteamTileTitle}>
            {requestDetail !== "expired"
              ? tooltipTrim(req, 74)
              : "Your match invite expired after 24 hours"}
          </Typography>
          <Box className={classes.receivedDatetime}>
            {dateTimeFormate(createdAt) + " - " + time}
          </Box>
        </Grid>
        {requestType !== "trade move" ? (
          requestDetail !== "expired" && (
            <Grid item md={2} className={classes.receivedIcons}>
              {requestDetail === "pending" ? (
                <>
                  <img
                    alt=" "
                    src={acceptImg}
                    height="30px"
                    width="30px"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      requestHandler({
                        requestType: requestType,
                        id: id,
                        fromId: fromId,
                        status: "accepted",
                      })
                    }
                  />
                  <img
                    alt=" "
                    src={declineImg}
                    height="30px"
                    width="30px"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      requestHandler({
                        requestType: requestType,
                        id: id,
                        fromId: fromId,
                        status: "cancelled",
                      })
                    }
                  />
                </>
              ) : (
                <Typography
                  component="span"
                  sx={{
                    color: requestDetail == "accepted" ? "#77F226" : "#D50C0C",
                  }}
                >
                  {capitalize(requestDetail)}
                </Typography>
              )}
            </Grid>
          )
        ) : (
          <Grid item md={2} className={classes.receivedIcons}>
            <Link
              to={`/user/fantasy-leagues/${flId}`}
              onClick={notifClickHandler}
            >
              <VisibilityIcon style={{ color: "#A4A4A4" }} />
            </Link>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
