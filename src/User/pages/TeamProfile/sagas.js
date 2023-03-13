import { takeLatest, call, put } from "redux-saga/effects";
import {
  getTeam,
  getTeamSuccess,
  getTeamFailed,
  updateTeam,
  updateTeamSuccess,
  updateTeamFailed,
  updateProfileBg,
  updateProfileBgSuccess,
  updateProfileBgFailed,
  updateProfileImg,
  updateProfileImgSuccess,
  updateProfileImgFailed,
  getCurrentTournaments,
  getCurrentTournamentsSuccess,
  getCurrentTournamentsFailed,
  getPlayedTournaments,
  getPlayedTournamentsSuccess,
  getPlayedTournamentsFailed,
  getFriends,
  getFriendsSuccess,
  getFriendsFailed,
  sendTeamInviteToFriend,
  sendTeamInviteToFriendSuccess,
  sendTeamInviteToFriendFailed,
  leaveTeam,
  leaveTeamSuccess,
  leaveTeamFailed,
  kickoutMember,
  kickoutMemberSuccess,
  kickoutMemberFailed,
  deleteTeam,
  deleteTeamSuccess,
  deleteTeamFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getTeamSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/team/teamDetail?id=" + payload.id
    );
    action = getTeamSuccess(response);
  } catch (e) {
    action = getTeamFailed(e.message);
  }
  yield put(action);
}
function* updateTeamSaga({ payload }) {
  let action;

  try {
    const response = yield call(request, "PATCH", "/api/team/team", payload);
    action = updateTeamSuccess(response);
  } catch (e) {
    action = updateTeamFailed(e.message);
  }
  yield put(action);
}
function* updateProfileBgSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/team/updateTeamCoverImage",
      payload
    );
    action = updateProfileBgSuccess(response);
  } catch (e) {
    action = updateProfileBgFailed(e.message);
  }
  yield put(action);
}
function* updateProfileImgSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/team/updateTeamTitleImage",
      payload
    );
    action = updateProfileImgSuccess(response);
  } catch (e) {
    action = updateProfileImgFailed(e.message);
  }
  yield put(action);
}
function* getCurrentTournamentsSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/tournament/currentTournament",
      payload
    );
    action = getCurrentTournamentsSuccess(response);
  } catch (e) {
    action = getCurrentTournamentsFailed(e.message);
  }
  yield put(action);
}
function* getPlayedTournamentsSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/tournament/pastTournament",
      payload
    );
    action = getPlayedTournamentsSuccess(response);
  } catch (e) {
    action = getPlayedTournamentsFailed(e.message);
  }
  yield put(action);
}
function* getFriendsSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "GET", "/api/user/myFiendsList");
    action = getFriendsSuccess(response);
  } catch (e) {
    action = getFriendsFailed(e.message);
  }
  yield put(action);
}
function* sendTeamInviteToFriendSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/team/teamInvite",
      payload
    );
    action = sendTeamInviteToFriendSuccess(response);
  } catch (e) {
    action = sendTeamInviteToFriendFailed(e);
  }
  yield put(action);
}
function* kickoutMemberSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/team/kickoutMember",
      payload
    );
    action = kickoutMemberSuccess(response);
  } catch (e) {
    action = kickoutMemberFailed(e);
  }
  yield put(action);
}
function* leaveTeamSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/team/leaveTeam",
      payload
    );
    action = leaveTeamSuccess(response);
  } catch (e) {
    action = leaveTeamFailed(e);
  }
  yield put(action);
}
function* deleteTeamSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "DELETE",
      "/api/team/team?teamId=" + payload.teamId
    );
    action = deleteTeamSuccess(response);
  } catch (e) {
    action = deleteTeamFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getTeam, getTeamSaga);
  yield takeLatest(updateTeam, updateTeamSaga);
  yield takeLatest(updateProfileBg, updateProfileBgSaga);
  yield takeLatest(updateProfileImg, updateProfileImgSaga);
  yield takeLatest(getCurrentTournaments, getCurrentTournamentsSaga);
  yield takeLatest(getPlayedTournaments, getPlayedTournamentsSaga);
  yield takeLatest(getFriends, getFriendsSaga);
  yield takeLatest(sendTeamInviteToFriend, sendTeamInviteToFriendSaga);
  yield takeLatest(kickoutMember, kickoutMemberSaga);
  yield takeLatest(leaveTeam, leaveTeamSaga);
  yield takeLatest(deleteTeam, deleteTeamSaga);
}
