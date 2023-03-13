import { IconButton, Typography, Box, Grid } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GeneralText from "../../../../components/generalText/generalText";
import ReceivedTile from "./components/tradeMoveReceived/tradeMoveReceived";
import SentTile from "./components/tradeMoveSent/tradeMoveSent";
import classes from "./index.module.scss";
import WaiverClaimTile from "./components/waiverClaimTile/waiverClaimTile";
import WaiverClaimModal from "./components/WaiverClaimModal/waiverClaimModal";
import {
  getTradeMoveRequests,
  getTradeMoveRequestsDetail,
  getTradeMoveRequestUpdate,
  getFlTeamProfile,
} from "../reducers";
import TradeoffInviteModal from "./components/TradeoffInviteModal/TradeoffInviteModal";

export default function TradeoffInvites({
  paramId,
  waivers,
  teamId,
  setShowTradMoves,
  waiverRemoveHander,
  sentRequests = [],
  receivedRequests = [],
}) {
  const dispatch = useDispatch();
  const [showWaivers, setShowWaivers] = useState(false);
  const [showWaiverClaimModal, setShowWaiverClaimModal] = useState(null);
  const [showtradeOffModal, setShowtradeOffModal] = useState(false);

  const { tradeMoveRequestDetail } = useSelector(
    (state) => state.userFantasyTeamModalProfile
  );

  const waiverRemoveClickHander = (id) => {
    setShowWaiverClaimModal(null);
    waiverRemoveHander(id);
  };
  const getTradeMoveRequestDetailHandler = (id) => {
    dispatch(getTradeMoveRequestsDetail({ id }));
  };
  const tradeOffInviteRequestHandler = ({
    recordId,
    approvedStatus,
    takePlayerId,
    givePlayerId,
    takeFlTeamId,
    giveFlTeamId,
  }) => {
    dispatch(
      getTradeMoveRequestUpdate({
        recordId,
        approvedStatus,
        takePlayerId,
        givePlayerId,
        takeFlTeamId,
        giveFlTeamId,
        fantasyLeagueId: paramId,
      })
    );
    dispatch(getTradeMoveRequests());
  };
  const setShowTradMovesHandler = () => {
    setShowTradMoves(false);
    dispatch(getFlTeamProfile({ id: teamId }));
    dispatch(getTradeMoveRequests());
  };

  return (
    <>
      <WaiverClaimModal
        dataObj={showWaiverClaimModal}
        open={showWaiverClaimModal?.playerId ? true : false}
        handleClose={() => setShowWaiverClaimModal(null)}
        requestHandler={waiverRemoveClickHander}
      />
      <TradeoffInviteModal
        open={showtradeOffModal}
        handleClose={() => setShowtradeOffModal(false)}
        tradeMoveRequestDetail={{
          ...tradeMoveRequestDetail,
          teamId,
        }}
        requestHandler={tradeOffInviteRequestHandler}
      />
      <Grid>
        <Box textAlign="left" className="far-apart-center">
          <Box>
            <IconButton onClick={() => setShowTradMovesHandler()}>
              <ChevronLeftIcon sx={{ color: "#F26826", pb: "3px" }} />
            </IconButton>
            <Typography
              component="span"
              sx={{ color: "white", fontSize: 26, fontWeight: "bold" }}
            >
              Trade Moves
            </Typography>
          </Box>
          <Typography
            component="p"
            sx={{ color: "white", fontSize: 26, fontWeight: "bold" }}
            pr={5}
          >
            <IconButton onClick={() => setShowWaivers(true)}>
              <VisibilityIcon style={{ color: "F26826" }} />
            </IconButton>
            Waiver claims
          </Typography>
        </Box>
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
                {sentRequests.map((invite) => {
                  return (
                    <Grid item key={invite?._id} width="95%">
                      <SentTile
                        invite={invite}
                        requestStatus={invite.requestDetail}
                        requestFrom={invite.fromUserName}
                        fromId={invite.fromId}
                        requestTo={invite.toUserName}
                        requestType={invite.requestType}
                        createdAt={invite.updatedAt}
                        time={invite.time}
                        id={invite?._id}
                        setShowtradeOffModal={setShowtradeOffModal}
                        getTradeMoveRequestDetailHandler={
                          getTradeMoveRequestDetailHandler
                        }
                      />
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <GeneralText text="No Sent Requests Found!" height="200px" />
            )}
          </Grid>
          {!showWaivers ? (
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
                    receivedRequests.map((invite) => {
                      return (
                        <Grid item key={invite?._id} width="95%">
                          <ReceivedTile
                            invite={invite}
                            requestStatus={invite.requestDetail}
                            requestFrom={invite.fromUserName}
                            fromId={invite.fromId}
                            requestTo={invite.requestTo}
                            requestType={invite.requestType}
                            createdAt={invite.updatedAt}
                            time={invite.time}
                            id={invite?._id}
                            setShowtradeOffModal={setShowtradeOffModal}
                            getTradeMoveRequestDetailHandler={
                              getTradeMoveRequestDetailHandler
                            }
                          />
                        </Grid>
                      );
                    })}
                </Grid>
              ) : (
                <GeneralText text="No Received Invites Found!" height="200px" />
              )}
            </Grid>
          ) : (
            <Grid item md={6}>
              <Typography
                component="span"
                sx={{ color: "white", fontSize: 24, fontWeight: "bold" }}
              >
                <IconButton onClick={() => setShowWaivers(false)}>
                  <ChevronLeftIcon sx={{ color: "#F26826", pb: "3px" }} />
                </IconButton>
                Waiver Claims
              </Typography>
              {waivers?.length ? (
                <Grid
                  container
                  mt={0.5}
                  width="100%"
                  className={classes.inviteScroll}
                >
                  {waivers?.map((x) => (
                    <Grid item width="95%" key={x.playerId}>
                      <WaiverClaimTile
                        id={x.playerId}
                        requestDetail={x.userName}
                        waiverClaimModalOpenHandler={() =>
                          setShowWaiverClaimModal({
                            ...x,
                          })
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <GeneralText text="No Waiver Claim Found!" height="200px" />
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
