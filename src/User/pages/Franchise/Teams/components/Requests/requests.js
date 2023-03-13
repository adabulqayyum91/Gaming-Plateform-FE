import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import acceptImg from "../../../../../../assets/Mask Group 285.svg";
import declineImg from "../../../../../../assets/Mask Group 286.svg";
import DateIcon from "../../../../../../assets/calendar-interface-symbol-tool.png";
import TimeIcon from "../../../../../../assets/timing.png";
import { capitalize } from "../../../../../../utils/apisauce";
import { dateTimeFormate, tooltipTrim } from "../../../../../../utils/apiutils";
import classes from "./requests.module.scss";
import { Link } from "react-router-dom";

export default function Requests({
  id,
  date,
  time,
  user,
  team,
  status,
  createdAt,
  isAddedToTeam,
  requestHandler,
  addtoTeamHandler,
}) {
  let req = " sent a tryout request for team " + team?.teamViewName;

  const HandleAccept = ({ icon, status }) => {
    return (
      <img
        alt=" "
        src={icon}
        height="30px"
        width="30px"
        style={{ cursor: "pointer", margin: "auto 10px" }}
        onClick={() =>
          requestHandler({
            _id: id,
            status: status,
          })
        }
      />
    );
  };

  return (
    <Box className={classes.receivedTryoutRoot}>
      <Grid container>
        <Grid item md={5}>
          <Typography className={classes.receivedTryoutTitle}>
            <span className={classes.userName}>
              <Link to={`/user/search-user-profile/${user?.userId}`}>
                <span className={classes.userName}>
                  {capitalize(user?.userName)}
                </span>
              </Link>
            </span>
            &nbsp;
            {tooltipTrim(req, 74)}
          </Typography>
          <Box className={classes.receivedDatetime}>
            {dateTimeFormate(createdAt)}
          </Box>
        </Grid>
        <Grid item md={4} display="flex" justifyContent="space-around">
          <Box>
            <img alt=" " src={DateIcon} />
            <Typography
              variant="span"
              className={classes.receivedTryoutDatetime}
            >
              {date}
            </Typography>
          </Box>
          <Box>
            <img alt=" " src={TimeIcon} />
            <Typography
              variant="span"
              className={classes.receivedTryoutDatetime}
            >
              {time}
            </Typography>
          </Box>
        </Grid>

        <Grid item md={3} className={classes.receivedIcons}>
          {status === "pending" ? (
            <>
              <HandleAccept icon={acceptImg} status="accepted" />
              <HandleAccept icon={declineImg} status="cancelled" />
            </>
          ) : (
            <Typography
              component="span"
              sx={{ color: status == "cancelled" ? "#D50C0C" : null }}
            >
              {status === "cancelled" ? (
                capitalize(status)
              ) : status === "accepted" && !isAddedToTeam ? (
                <Grid container flexDirection="column" alignItems="center">
                  <Typography
                    component="span"
                    className={classes.accepted}
                    onClick={() =>
                      addtoTeamHandler({
                        teamId: team.teamId,
                        userId: user.userId,
                        _id: id,
                      })
                    }
                  >
                    Add to team
                  </Typography>
                  <span style={{ color: "whitesmoke", fontSize: "12px" }}>
                    Send friend request and chat
                    <br /> with user(friend) to take tryout!
                  </span>
                </Grid>
              ) : status === "accepted" && isAddedToTeam ? (
                <span style={{ color: "#77F226" }}>Added to the team</span>
              ) : null}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
