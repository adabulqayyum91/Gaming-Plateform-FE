import { takeLatest, call, put } from "redux-saga/effects";
import {
  getUser,
  getUserSuccess,
  getUserFailed,
  sendFriendReq,
  sendFriendReqSuccess,
  sendFriendReqFailed,
  deleteFriendReq,
  deleteFriendReqSuccess,
  deleteFriendReqFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getUserSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/searchUserProfile?query=" + payload.id
    );
    action = getUserSuccess(response);
  } catch (e) {
    action = getUserFailed(e);
  }
  yield put(action);
}
function* sendFriendReqSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/friendRequest",
      payload
    );
    action = sendFriendReqSuccess(response);
  } catch (e) {
    action = sendFriendReqFailed(e);
  }
  yield put(action);
}
function* deleteFriendReqSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "DELETE",
      "/api/user/friendRequest?friendId=" + payload.friendId
    );
    action = deleteFriendReqSuccess(response);
  } catch (e) {
    action = deleteFriendReqFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getUser, getUserSaga);
  yield takeLatest(sendFriendReq, sendFriendReqSaga);
  yield takeLatest(deleteFriendReq, deleteFriendReqSaga);
}
