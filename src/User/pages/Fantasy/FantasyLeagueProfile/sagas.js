import { takeLatest, call, put } from "redux-saga/effects";
import {
  getFlProfile,
  getFlProfileSuccess,
  getFlProfileFailed,
  joinFL,
  joinFLSuccess,
  joinFLFailed,
  sendFlInvitation,
  sendFlInvitationSuccess,
  sendFlInvitationFailed,
  getFantasyTeamProfile,
  getFantasyTeamProfileSuccess,
  getFantasyTeamProfileFailed,
  editFantasyTeamProfile,
  editFantasyTeamProfileSuccess,
  editFantasyTeamProfileFailed,
  getTeamPlayersList,
  getTeamPlayersListSuccess,
  getTeamPlayersListFailed,
  addPlayerToFL,
  addPlayerToFLSuccess,
  addPlayerToFLFailed,
  updatePlayerToFL,
  updatePlayerToFLSuccess,
  updatePlayerToFLFailed,
  getFlSchedule,
  getFlScheduleSuccess,
  getFlScheduleFailed,
  getFlLeaderboard,
  getFlLeaderboardSuccess,
  getFlLeaderboardFailed,
  getFlStats,
  getFlStatsSuccess,
  getFlStatsFailed,
  getScheduleMatchProfile,
  getScheduleMatchProfileSuccess,
  getScheduleMatchProfileFailed,
} from "./reducers";

import request from "../../../../utils/apisauce";

function* getFlProfileSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/fantasyLeague?fantasyLeagueId=" + payload.id
    );
    action = getFlProfileSuccess(response);
  } catch (e) {
    action = getFlProfileFailed(e);
  }
  yield put(action);
}
function* joinFLSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/fantasyLeague/fantasyLeague",
      payload
    );
    action = joinFLSuccess(response);
  } catch (e) {
    action = joinFLFailed(e);
  }
  yield put(action);
}
function* sendFlInvitationSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/flInvitation",
      payload
    );
    action = sendFlInvitationSuccess(response);
  } catch (e) {
    action = sendFlInvitationFailed(e);
  }
  yield put(action);
}
function* getFantasyTeamProfileSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/flTeam?flTeamId=" + payload.id
    );
    action = getFantasyTeamProfileSuccess(response);
  } catch (e) {
    action = getFantasyTeamProfileFailed(e);
  }
  yield put(action);
}
function* editFantasyTeamProfileSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "PUT", "/api/user/flTeam", payload);
    action = editFantasyTeamProfileSuccess(response);
  } catch (e) {
    action = editFantasyTeamProfileFailed(e);
  }
  yield put(action);
}
function* getTeamPlayersListSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      `/api/user/leaguePlayersList?leagueId=${payload.leagueId}&fantasyLeagueId=${payload.fantasyLeagueId}`
    );
    action = getTeamPlayersListSuccess(response);
  } catch (e) {
    action = getTeamPlayersListFailed(e);
  }
  yield put(action);
}
function* addPlayerToFLSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", `/api/user/flTeam`, payload);
    action = addPlayerToFLSuccess(response);
  } catch (e) {
    action = addPlayerToFLFailed(e);
  }
  yield put(action);
}
function* updatePlayerToFLSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "PATCH", `/api/user/flTeam`, payload);
    action = updatePlayerToFLSuccess({
      ...response,
      oldPlayerId: payload.oldPlayerId,
    });
  } catch (e) {
    action = updatePlayerToFLFailed(e);
  }
  yield put(action);
}
function* getFlScheduleSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      `/api/user/flschedule?fantasyLeagueId=${payload.id}`
    );
    action = getFlScheduleSuccess(response);
  } catch (e) {
    action = getFlScheduleFailed(e);
  }
  yield put(action);
}
function* getFlLeaderboardSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      `/api/user/flLeaderBoard?fantasyLeagueId=${payload.id}`
    );
    action = getFlLeaderboardSuccess(response);
  } catch (e) {
    action = getFlLeaderboardFailed(e);
  }
  yield put(action);
}
function* getFlStatsSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      `/api/user/flStats?fantasyLeagueId=${payload.id}`
    );
    action = getFlStatsSuccess(response);
  } catch (e) {
    action = getFlStatsFailed(e);
  }
  yield put(action);
}
function* getScheduleMatchProfileSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      `/api/user/flTeamsDetail?_id=${payload.id}`
    );
    action = getScheduleMatchProfileSuccess(response);
  } catch (e) {
    action = getScheduleMatchProfileFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getFlProfile, getFlProfileSaga);
  yield takeLatest(joinFL, joinFLSaga);
  yield takeLatest(sendFlInvitation, sendFlInvitationSaga);
  yield takeLatest(getFantasyTeamProfile, getFantasyTeamProfileSaga);
  yield takeLatest(getTeamPlayersList, getTeamPlayersListSaga);
  yield takeLatest(addPlayerToFL, addPlayerToFLSaga);
  yield takeLatest(updatePlayerToFL, updatePlayerToFLSaga);
  yield takeLatest(getFlSchedule, getFlScheduleSaga);
  yield takeLatest(getFlLeaderboard, getFlLeaderboardSaga);
  yield takeLatest(getFlStats, getFlStatsSaga);
  yield takeLatest(getScheduleMatchProfile, getScheduleMatchProfileSaga);
  yield takeLatest(editFantasyTeamProfile, editFantasyTeamProfileSaga);
}
