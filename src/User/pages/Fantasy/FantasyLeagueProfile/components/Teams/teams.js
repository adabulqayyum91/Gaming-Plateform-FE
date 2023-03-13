import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";

import profileSelfImg from "../../../../../../assets/teamprofile.png";
import GeneralText from "../../../../../components/generalText/generalText";
import addRosterImg from "../../../../../../assets/Mask Group 299.svg";
import TeamPlayerSelection from "./TeamPlayerSelection/teamPlayerSelection";
import TeamTile from "./teamTile";
import NameEdit from "../../../../TeamProfile/modal/nameEdit";
import { useDispatch } from "react-redux";
import { editFantasyTeamProfile } from "../../reducers";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function Teams({
  id,
  profile,
  isOwner,
  isLeagueStarted,
  setTeamReqModal,
}) {
  const dispatch = useDispatch();
  const [clickedTeam, setClickedTeam] = useState({});
  const [showNameEditModal, setShowNameEditModal] = useState(false);

  if (clickedTeam._id && profile?.leagueId) {
    return (
      <TeamPlayerSelection
        teamDetails={clickedTeam}
        fantasyLeagueId={id}
        teamId={clickedTeam._id}
        leagueId={profile?.leagueId}
        setClickedTeam={setClickedTeam}
      />
    );
  }
  const handleUpdateTeamName = (values) => {
    const teamName = values.teamViewName;
    dispatch(
      editFantasyTeamProfile({
        flTeamId: profile?.myTeam?._id,
        flTeamName: teamName,
      })
    );
    setShowNameEditModal(false);
  };
  const setShowNameEditModalHandler = (e, val) => {
    e.preventDefault();
    e.stopPropagation();
    setShowNameEditModal(val);
  };

  return (
    <Grid item md={12}>
      <NameEdit
        open={showNameEditModal}
        teamViewName={profile.myTeam?.teamViewName}
        handleClose={() => setShowNameEditModal(false)}
        handleUpdateUser={handleUpdateTeamName}
      />
      {isLeagueStarted && !profile?.leagueJoined && (
        <Typography
          component="p"
          color="#F26826"
          fontWeight="bold"
          textAlign="center"
        >
          League has been started. You can't join this league now.
        </Typography>
      )}
      <Typography component="p" color="white" fontWeight="bold">
        My Team
      </Typography>
      {profile?.myTeam?._id ? (
        <Grid container my={1} sx={{ maxWidth: "250px" }}>
          <TeamTile
            link=""
            id={profile.myTeam?._id}
            title={profile.myTeam?.teamViewName}
            setShowNameEditModal={setShowNameEditModalHandler}
            onClickHandler={() => setClickedTeam(profile?.myTeam)}
            owner={true}
            img={
              profile.myTeam?.teamTitleImage
                ? BASE_URL + profile.myTeam?.teamTitleImage
                : profileSelfImg
            }
          />
        </Grid>
      ) : (
        <GeneralText text="No Team Found!" />
      )}
      <Typography component="p" color="white" marginY={3} fontWeight="bold">
        Other Teams
        {isOwner && !isLeagueStarted && (
          <img
            alt=" "
            src={addRosterImg}
            onClick={() => setTeamReqModal(true)}
            style={{ cursor: "pointer" }}
          />
        )}
      </Typography>
      <Grid container my={1}>
        {profile?.otherTeams?.length ? (
          <Grid container spacing={3} columnSpacing={5}>
            {profile?.otherTeams?.map((x, i) => (
              <Grid
                item
                key={i}
                md={12 / 2}
                lg={12 / 2}
                xl={12 / 3}
                sx={{ maxWidth: "250px" }}
              >
                <TeamTile
                  link=""
                  id={x._id}
                  title={x.teamViewName}
                  onClickHandler={() => setClickedTeam(x)}
                  img={
                    x.teamTitleImage
                      ? BASE_URL + x.teamTitleImage
                      : profileSelfImg
                  }
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
