import React, { useEffect } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import GeneralText from "../../../../../../components/generalText/generalText";
import PlayerSelectionCard from "../../../../../../components/PlayerSelectionCard/playerSelectionCard";
import classes from "../subComponents.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlayerToFL,
  getFantasyTeamProfile,
  getTeamPlayersList,
  updatePlayerToFL,
} from "../../../reducers";
import { getUser } from "../../../../../Profile/reducers";

export default function TeamPlayerSelection({
  teamDetails,
  teamId,
  leagueId,
  fantasyLeagueId,
  setClickedTeam,
}) {
  const dispatch = useDispatch();
  const { teamProfile, playersList } = useSelector(
    (state) => state.userFantasyLeagueProfile
  );
  const { profile } = useSelector((state) => state.userProfile);

  let _teamViewNameArr = (teamDetails?.teamViewName).split(" ");
  let isJoined =
    profile?.userDetail?.userName ===
    _teamViewNameArr[_teamViewNameArr.length - 1];

  useEffect(() => {
    dispatch(getFantasyTeamProfile({ id: teamId }));
    dispatch(getTeamPlayersList({ leagueId, fantasyLeagueId }));
    dispatch(getUser());
  }, []);

  const lockPlayerHanlder = (playerId, id) => {
    if (id === null) {
      dispatch(
        addPlayerToFL({
          flTeamId: teamId,
          playerId: playerId,
        })
      );
    } else {
      dispatch(
        updatePlayerToFL({
          flTeamId: teamId,
          playerId: playerId,
          oldPlayerId: id,
        })
      );
    }
    setTimeout(() => {
      dispatch(getTeamPlayersList({ leagueId, fantasyLeagueId }));
    }, 300);
  };

  return (
    <Grid item md={12}>
      <Typography component="p" color="white" fontWeight="bold">
        <IconButton onClick={() => setClickedTeam({})}>
          <ChevronLeftIcon sx={{ color: "#F26826", pb: "3px" }} />
        </IconButton>
        My Team
      </Typography>
      <Grid container my={1}>
        {teamProfile?.teamData?.length ? (
          <Grid container spacing={3} columnSpacing={5}>
            {teamProfile?.teamData?.map((x, i) => (
              <Grid
                item
                key={i}
                md={12 / 2}
                lg={12 / 2}
                xl={12 / 3}
                className={classes.playerTile}
              >
                <PlayerSelectionCard
                  dataObj={x}
                  teamId={teamId}
                  isJoined={isJoined}
                  playersList={playersList}
                  lockPlayerHanlder={lockPlayerHanlder}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <GeneralText text="No Team Found!" />
        )}
      </Grid>
    </Grid>
  );
}
