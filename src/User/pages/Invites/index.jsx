import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getInvites,
  handleFLInvite,
  handleFriendReq,
  handleTeamInviteReq,
  handleMatchInviteReq,
  handleFranchiseTeamInviteReq,
} from "./reducers";
import GeneralText from "../../components/generalText/generalText";
import ReceivedTile from "./components/received/received";
import SentTile from "./components/sent/sent";
import { getUser } from "../Profile/reducers";
import { createConversation } from "../../layout/chatbar/reducers";
import classes from "./index.module.scss";

export default function Invites() {
  const dispatch = useDispatch();
  const { receivedRequests, sentRequests } = useSelector(
    (state) => state.userInvites
  );

  useEffect(() => {
    dispatch(getInvites());
  }, []);

  const requestHandler = (obj) => {
    if (obj.requestType === "friend request") {
      dispatch(handleFriendReq({ fromId: obj.fromId, status: obj.status }));
      if (obj.status === "accepted") {
        setTimeout(() => {
          dispatch(
            createConversation({
              receiverId: obj.fromId,
            })
          );
        }, 300);
      }
    } else if (obj.requestType === "team invite") {
      dispatch(
        handleTeamInviteReq({
          teamId: obj.id,
          fromId: obj.fromId,
          status: obj.status,
        })
      );
    } else if (obj.requestType === "match invite") {
      dispatch(
        handleMatchInviteReq({
          matchId: obj.id,
          status: obj.status,
        })
      );
      setTimeout(() => {
        dispatch(getUser());
      }, 500);
    } else if (obj.requestType === "franchise team invite") {
      dispatch(
        handleFranchiseTeamInviteReq({
          teamId: obj.id,
          fromId: obj.fromId,
          status: obj.status,
        })
      );
    } else if (obj.requestType === "fl request") {
      dispatch(
        handleFLInvite({
          fantasyLeagueId: obj.id,
          fromId: obj.fromId,
          status: obj.status,
        })
      );
    }
  };

  return (
    <>
      <Grid container>
        <Grid item md={6}>
          <Typography
            component="span"
            sx={{ color: "white", fontSize: 24, fontWeight: "bold" }}
          >
            Sent
          </Typography>
          {sentRequests?.length ? (
            <Grid
              container
              mt={0.5}
              width="100%"
              className={classes.inviteScroll}
            >
              {sentRequests &&
                sentRequests.map((invite, i) => {
                  return (
                    <Grid item key={i} width="95%">
                      <SentTile
                        requestDetail={invite.requestDetail}
                        requestFrom={invite.requestFrom}
                        requestTo={invite.requestTo}
                        requestType={invite.requestType}
                        createdAt={invite.createdAt}
                        flId={invite?.fantasyLeagueId}
                        time={invite.time}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          ) : (
            <GeneralText text="No Sent Requests Found!" />
          )}
        </Grid>
        <Grid item md={6}>
          <Typography
            component="span"
            sx={{ color: "white", fontSize: 24, fontWeight: "bold" }}
          >
            Received
          </Typography>
          {receivedRequests?.length ? (
            <Grid
              container
              mt={0.5}
              width="100%"
              className={classes.inviteScroll}
            >
              {receivedRequests &&
                receivedRequests.map((invite, i) => {
                  return (
                    <Grid item key={i} width="95%">
                      <ReceivedTile
                        requestDetail={invite.requestDetail}
                        requestFrom={invite.requestFrom}
                        fromId={invite.fromId}
                        requestTo={invite.requestTo}
                        requestType={invite.requestType}
                        createdAt={invite.createdAt}
                        flId={invite?.fantasyLeagueId}
                        time={invite.time}
                        id={invite?.id ?? ""}
                        requestHandler={requestHandler}
                        credits={invite?.credits}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          ) : (
            <GeneralText text="No Received Invites Found!" />
          )}
        </Grid>
      </Grid>
    </>
  );
}
