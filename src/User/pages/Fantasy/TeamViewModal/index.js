import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Tooltip } from "@mui/material";
import { capitalize } from "@material-ui/core";
import Badge from "@mui/material/Badge";

import FlTeamPlayerCard from "../../../components/FlTeamPlayerCard/FlTeamPlayerCard";
import GeneralText from "../../../components/generalText/generalText";
import GeneralModal from "../../../components/topModal/topModal";
import classes from "./TeamViewModal.module.scss";
import DynamicButton from "../../../components/dynamicButton/dynamicButton";
import { useDispatch, useSelector } from "react-redux";
import TradeoffInvites from "./TradeoffInvites";
import TradeoffModal from "./TradeoffInvites/components/TradeoffModal/TradeoffModal";
import {
  dropPlayerFlTeam,
  getFlTeamProfile,
  getPlayerForTradePerposal,
  sendTradePerposal,
  trademoveFlTeam,
  getTradeMoveRequests,
  resetAllState,
} from "./reducers";
import { useParams } from "react-router-dom";

export default function TeamViewModal({ teamId, showModal, handleClose }) {
  const { id: paramId } = useParams();
  const dispatch = useDispatch();
  const [showTradMoves, setShowTradMoves] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);

  const { profile, tradeMoveData, traveMoveRequests } = useSelector(
    (state) => state.userFantasyTeamModalProfile
  );
  const { profile: fantProfile } = useSelector(
    (state) => state.userFantasyLeagueProfile
  );

  useEffect(() => {
    teamId && dispatch(getFlTeamProfile({ id: teamId }));
    teamId && dispatch(getTradeMoveRequests());
  }, [teamId]);

  const playerCardActionHandler = (id, val) => {
    if (val == "waiverClaim") {
      dispatch(
        trademoveFlTeam({
          flTeamId: teamId,
          flMemberId: id,
          status: true,
        })
      );
    } else {
      dispatch(
        dropPlayerFlTeam({
          flTeamId: teamId,
          flMemberId: id,
        })
      );
    }
  };
  const waiverRemoveHander = (id) => {
    dispatch(
      trademoveFlTeam({
        flTeamId: teamId,
        flMemberId: id,
        status: false,
      })
    );
  };
  const showTradeModalHandler = (id) => {
    setShowTradeModal(true);
    dispatch(
      getPlayerForTradePerposal({
        playerId: id,
        flId: paramId,
        flTeamId: teamId,
      })
    );
  };
  const sendTradePerposalHandler = (id1, id2) => {
    setShowTradeModal(false);
    dispatch(
      sendTradePerposal({
        flTeamId: teamId,
        givePlayerId: id1,
        takePlayerId: id2,
      })
    );
    dispatch(getFlTeamProfile({ id: teamId }));
  };
  const showInvitesHandler = (val) => {
    setShowTradMoves(val);
    dispatch(getTradeMoveRequests());
  };
  let pendingTradeRequests = traveMoveRequests?.sentRequests?.filter(
    (e) => e.requestDetail === "pending"
  );
  let _pendingTradeRequests = traveMoveRequests?.receivedRequests?.filter(
    (e) => e.requestDetail === "pending"
  );
  let pendingCount =
    _pendingTradeRequests?.length + pendingTradeRequests?.length;

  const waivers = profile?.teamData?.filter((x, i) => x.blockTradeOff === true);
  const noWaivers = profile?.teamData?.filter(
    (x, i) => x.blockTradeOff === false
  );
  const isOwner = fantProfile?.myTeam?._id == teamId;

  const TeamProfile = () => (
    <Grid item md={12} textAlign="left">
      <TradeoffModal
        open={showTradeModal}
        handleClose={() => setShowTradeModal(false)}
        tradeMoveData={tradeMoveData}
        sendTradeHandler={sendTradePerposalHandler}
      />
      <Box>
        <Grid className="far-apart-center">
          <Typography
            component="p"
            color="white"
            fontWeight="bold"
            fontSize="30px"
            my={3}
          >
            {capitalize(profile?.flTeamName ?? "")}
            <Typography
              component="span"
              color="#F26826"
              fontWeight="bold"
              fontSize="30px"
              pl={3}
            >
              {profile?.teamPoints} PTS
            </Typography>
          </Typography>
          {isOwner && (
            <Tooltip title={pendingCount + " pending invites"} placement="top">
              <Badge badgeContent={pendingCount} color="primary">
                <DynamicButton
                  title="Trade Moves & Waiver Claims"
                  clickHandler={() => showInvitesHandler(true)}
                  pl="20px"
                  pr="20px"
                  pt="5px"
                  pb="5px"
                  color={true}
                />
              </Badge>
            </Tooltip>
          )}
        </Grid>
        <Grid container spacing={3} className={classes.matchTeamScroll}>
          {noWaivers?.length ? (
            noWaivers?.map((x) => {
              return (
                <Grid item key={x.playerId} md={12 / 2} lg={12 / 3} xl={12 / 5}>
                  <FlTeamPlayerCard
                    id={x.playerId}
                    key={x.playerId}
                    win={x.win}
                    points={x.points}
                    name={x.userName}
                    img={x.profileImage}
                    winPercentage={x.winPercentage}
                    showTradeModalHandler={showTradeModalHandler}
                    isOwner={isOwner ? "owner" : "notOwner"}
                    tradeStatus={x?.tradeStatus}
                    playerCardActionHandler={playerCardActionHandler}
                  />
                </Grid>
              );
            })
          ) : (
            <GeneralText text="No Players Found!" height="200px" />
          )}
        </Grid>
      </Box>
    </Grid>
  );
  const closeHandler = () => {
    handleClose();
    setShowTradMoves(false);
    dispatch(resetAllState());
  };

  return (
    <GeneralModal
      widthe="90%"
      maxHait="650px"
      open={showModal}
      handleClose={closeHandler}
    >
      {!showTradMoves ? (
        <TeamProfile />
      ) : (
        <TradeoffInvites
          paramId={paramId}
          teamId={teamId}
          setShowTradMoves={setShowTradMoves}
          sentRequests={traveMoveRequests?.sentRequests}
          receivedRequests={traveMoveRequests?.receivedRequests}
          waivers={waivers?.length ? waivers : []}
          waiverRemoveHander={waiverRemoveHander}
        />
      )}
    </GeneralModal>
  );
}
