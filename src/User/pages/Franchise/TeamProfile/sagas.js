import { takeLatest, call, put } from "redux-saga/effects";
import {
  getFranchiseTeam,
  getFranchiseTeamSuccess,
  getFranchiseTeamFailed,
  sendFranchiseTeamInvite,
  sendFranchiseTeamInviteSuccess,
  sendFranchiseTeamInviteFailed,
  kickoutFranchiseMember,
  kickoutFranchiseMemberSuccess,
  kickoutFranchiseMemberFailed,
  leaveTeam,
  leaveTeamSuccess,
  leaveTeamFailed,
  deleteTeam,
  deleteTeamSuccess,
  deleteTeamFailed,
  updateTeamLeader,
  updateTeamLeaderSuccess,
  updateTeamLeaderFailed,
  updateTeamRosterStats,
  updateTeamRosterStatsSuccess,
  updateTeamRosterStatsFailed,
} from "./reducers";

import request from "../../../../utils/apisauce";

function* getFranchiseTeamSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/team/franchiseTeam?id=" + payload.id
    );
    action = getFranchiseTeamSuccess(response);
  } catch (e) {
    action = getFranchiseTeamFailed(e);
  }
  yield put(action);
}
function* sendFranchiseTeamInviteSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/team/franchiseTeamInvite",
      payload
    );
    action = sendFranchiseTeamInviteSuccess(response);
  } catch (e) {
    action = sendFranchiseTeamInviteFailed(e);
  }
  yield put(action);
}
function* kickoutFranchiseMemberSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/team/kickOutFranchiseMember",
      payload
    );
    action = kickoutFranchiseMemberSuccess(response);
  } catch (e) {
    action = kickoutFranchiseMemberFailed(e);
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
      "/api/team/franchiseTeam?teamId=" + payload.teamId
    );
    action = deleteTeamSuccess(response);
  } catch (e) {
    action = deleteTeamFailed(e);
  }
  yield put(action);
}
function* updateTeamLeaderSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/team/updateTeamLeader",
      payload
    );
    action = updateTeamLeaderSuccess(response);
  } catch (e) {
    action = updateTeamLeaderFailed(e);
  }
  yield put(action);
}
function* updateTeamRosterStatsSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/team/teamMember",
      payload
    );
    action = updateTeamRosterStatsSuccess(response);
  } catch (e) {
    action = updateTeamRosterStatsFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getFranchiseTeam, getFranchiseTeamSaga);
  yield takeLatest(sendFranchiseTeamInvite, sendFranchiseTeamInviteSaga);
  yield takeLatest(kickoutFranchiseMember, kickoutFranchiseMemberSaga);
  yield takeLatest(leaveTeam, leaveTeamSaga);
  yield takeLatest(deleteTeam, deleteTeamSaga);
  yield takeLatest(updateTeamLeader, updateTeamLeaderSaga);
  yield takeLatest(updateTeamRosterStats, updateTeamRosterStatsSaga);
}
