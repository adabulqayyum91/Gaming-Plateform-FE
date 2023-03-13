import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import FriendRequest from "./modal/friendRequest";
import TopSection from "./components/topSection/topSection";
import BottomSection from "./components/bottomSection/bottomSection";
import "./index.css";
import {
  sendFranchiseTeamInvite,
  deleteTeam,
  leaveTeam,
  getFranchiseTeam,
  kickoutFranchiseMember,
  updateTeamLeader,
  setIsDeleted,
  updateTeamRosterStats,
} from "./reducers";
import KickoutModal from "./modal/kickoutModal";
import { getFriends } from "../../TeamProfile/reducers";
import UpdateLeader from "./modal/updateLeader";
import DeleteModal from "../../../../Admin/components/DeleteModal/deletemodal";
import RosterPercentageModal from "./modal/rosterPercentageModal";

const USER_ID = localStorage.getItem("user_id");

const TeamProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [kickoutModal, setKickoutModal] = useState(false);
  const [kickoutId, setKickoutId] = useState();
  const [friendModal, setFriendModal] = useState(false);
  const [leaderEdit, setLeaderEdit] = useState(false);
  const [isDeletedModal, setIsDeletedModal] = useState(false);
  const [perctObj, setPerctObj] = useState({
    id: null,
    open: false,
    title: "",
    percentage: 0,
  });

  const { profile, isDeleted } = useSelector(
    (state) => state.userFranchiseTeamProfile
  );
  //to check if the loggedin user is the member of the team
  const isMember = profile?.rooster?.some((x) => x._id === USER_ID);

  const { friends } = useSelector((state) => state.userTeamProfile);
  const { franchise } = useSelector((state) => state.userFranchiseProfile);
  const { createdBy } = franchise;

  if (isDeleted) {
    dispatch(setIsDeleted(false));
    navigate("/user/grand-prix");
  }

  useEffect(() => {
    dispatch(getFranchiseTeam({ id: id }));
  }, []);

  const handleClose = () => {
    setFriendModal(false);
    setKickoutModal(false);
    setLeaderEdit(false);
  };
  const teamReqModal = () => {
    setFriendModal(true);
    dispatch(getFriends());
  };
  const handleTeamInviteToFriend = (values) => {
    dispatch(sendFranchiseTeamInvite({ ...values, teamId: id }));
    setFriendModal(false);
  };
  const kickoutHanlder = (val) => {
    setKickoutModal(true);
    setKickoutId(val);
  };
  const kickoutModalHander = () => {
    dispatch(kickoutFranchiseMember({ teamId: id, teamMemberId: kickoutId }));
    setKickoutModal(false);
  };
  const deleteTeamHandler = () => {
    dispatch(deleteTeam({ teamId: id }));
  };
  const leaveTeamHandler = () => {
    dispatch(leaveTeam({ teamId: id }));
  };
  const handleUpdateLeader = (vals) => {
    dispatch(updateTeamLeader({ ...vals, teamId: id }));
    setLeaderEdit(false);
  };
  const updateRosterPercentage = (vals) => {
    dispatch(
      updateTeamRosterStats({
        numberValue: vals?.percentage,
        type: vals?.type,
        teamId: id,
        memberId: vals?.id,
      })
    );
    setPerctObj({ open: false, title: "", percentage: 0 });
  };

  return (
    <>
      <RosterPercentageModal
        perctObj={perctObj}
        handleClose={() =>
          setPerctObj({ open: false, title: "", percentage: 0 })
        }
        confirmPerctHandler={updateRosterPercentage}
      />
      <DeleteModal
        open={isDeletedModal}
        handleClose={() => setIsDeletedModal(false)}
        confirmDeleteHandler={deleteTeamHandler}
      />
      <KickoutModal
        open={kickoutModal}
        handleClose={handleClose}
        kickoutHanlder={kickoutModalHander}
      />
      <UpdateLeader
        open={leaderEdit}
        roosters={profile?.rooster}
        handleClose={handleClose}
        handleUpdateLeader={handleUpdateLeader}
      />
      {friends && (
        <FriendRequest
          friends={friends}
          open={friendModal}
          handleClose={handleClose}
          handleTeamInviteToFriend={handleTeamInviteToFriend}
        />
      )}
      <Box>
        <TopSection
          profile={profile}
          deleteTeamHandler={deleteTeamHandler}
          leaveTeamHandler={leaveTeamHandler}
          setIsDeletedModal={setIsDeletedModal}
          createdBy={createdBy}
          isMember={isMember}
        />
        {profile && (
          <BottomSection
            profile={profile}
            setLeaderEdit={setLeaderEdit}
            setFriendModal={teamReqModal}
            kickoutHanlder={kickoutHanlder}
            setPerctObj={setPerctObj}
            createdBy={createdBy}
          />
        )}
      </Box>
    </>
  );
};

export default TeamProfile;
