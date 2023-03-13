import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import NameEdit from "./modal/nameEdit";
import FriendRequest from "./modal/friendRequest";
import TopSection from "./components/topSection/topSection";
import BottomSection from "./components/bottomSection/bottomSection";
import CurrentTournaments from "./components/currentTournaments/currentTournaments";
import PlayedTournaments from "./components/playedTournaments/playedTournaments";
import DynamicButton from "../../components/dynamicButton/dynamicButton";
import "./index.css";
import {
  getCurrentTournaments,
  getFriends,
  sendTeamInviteToFriend,
  getPlayedTournaments,
  getTeam,
  updateProfileBg,
  updateProfileImg,
  updateTeam,
  kickoutMember,
  deleteTeam,
  leaveTeam,
} from "./reducers";
import KickoutModal from "./modal/kickoutModal";
import DeleteModal from "../../../Admin/components/DeleteModal/deletemodal";

const TournamensTypeBar = [
  "Overview",
  "Current Tournaments",
  "Played Tournaments",
];

const TeamProfile = () => {
  const [tournamentType, setTournamentType] = useState("Overview");
  const [kickoutModal, setKickoutModal] = useState(false);
  const [isDeletedModal, setIsDeletedModal] = useState(false);
  const [kickoutId, setKickoutId] = useState();
  const [friendModal, setFriendModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nameEdit, setNameEdit] = useState(false);
  const { profile, tournaments, friends, isDeleted } = useSelector(
    (state) => state.userTeamProfile
  );
  if (isDeleted) {
    dispatch(getTeam({ id: id }));
    navigate("/user/my-teams");
  }

  useEffect(() => {
    dispatch(getTeam({ id: id }));
  }, []);

  const handleClose = () => {
    setNameEdit(false);
    setFriendModal(false);
    setKickoutModal(false);
  };
  const handleUpdateUser = (val) => {
    dispatch(updateTeam({ teamId: id, ...val }));
    setNameEdit(false);
  };
  const teamProfileImgHandler = (e) => {
    dispatch(updateProfileImg(e));
  };
  const SampleprofileBgImgHandler = (e) => {
    dispatch(updateProfileBg(e));
  };
  const tournamentTypeHandler = (val) => {
    setTournamentType(val);
    if (val === "Current Tournaments")
      dispatch(getCurrentTournaments({ teamId: id }));
    else if (val === "Played Tournaments")
      dispatch(getPlayedTournaments({ teamId: id }));
  };
  const teamReqModal = () => {
    setFriendModal(true);
    dispatch(getFriends());
  };
  const handleTeamInviteToFriend = (values) => {
    dispatch(sendTeamInviteToFriend({ ...values, teamId: id }));
    setFriendModal(false);
  };
  const kickoutHanlder = (val) => {
    setKickoutModal(true);
    setKickoutId(val);
  };
  const kickoutModalHander = () => {
    dispatch(kickoutMember({ teamId: id, teamMemberId: kickoutId }));
    setKickoutModal(false);
  };
  const deleteTeamHandler = () => {
    dispatch(deleteTeam({ teamId: id }));
    setIsDeletedModal(false);
  };
  const leaveTeamHandler = () => {
    dispatch(leaveTeam({ teamId: id }));
  };

  return (
    <>
      <DeleteModal
        open={isDeletedModal}
        handleClose={() => setIsDeletedModal(false)}
        confirmDeleteHandler={deleteTeamHandler}
      />
      <NameEdit
        open={nameEdit}
        teamViewName={profile?.teamViewName}
        handleClose={handleClose}
        handleUpdateUser={handleUpdateUser}
      />
      <KickoutModal
        open={kickoutModal}
        handleClose={handleClose}
        kickoutHanlder={kickoutModalHander}
      />
      {friends && (
        <FriendRequest
          friends={friends}
          open={friendModal}
          handleClose={handleClose}
          handleTeamInviteToFriend={handleTeamInviteToFriend}
        />
      )}
      <div className="userprofile-containerWrapper ">
        <TopSection
          profile={profile}
          SampleprofileBgImgHandler={SampleprofileBgImgHandler}
          teamProfileImgHandler={teamProfileImgHandler}
          setNameEdit={setNameEdit}
          deleteTeamHandler={deleteTeamHandler}
          leaveTeamHandler={leaveTeamHandler}
          setIsDeletedModal={setIsDeletedModal}
          teamId={id}
        />
        <Grid container columnSpacing={2} alignItems="left">
          {TournamensTypeBar.map((x, i) => (
            <Grid item key={i} onClick={() => tournamentTypeHandler(x)}>
              <DynamicButton
                title={x}
                color={x === tournamentType ? true : false}
                pl="50px"
                pr="50px"
                pt="7px"
                pb="7px"
              />
            </Grid>
          ))}
        </Grid>
        {tournamentType === "Overview" && profile ? (
          <BottomSection
            profile={profile}
            setTournamentModal={setTournamentType}
            setFriendModal={teamReqModal}
            kickoutHanlder={kickoutHanlder}
          />
        ) : tournamentType === "Current Tournaments" ? (
          <CurrentTournaments tournaments={tournaments} />
        ) : (
          <PlayedTournaments tournaments={tournaments} />
        )}
      </div>
    </>
  );
};

export default TeamProfile;
