import { takeLatest, call, put } from "redux-saga/effects";
import {
  getConversations,
  getConversationsSuccess,
  getConversationsFailed,
  createConversation,
  createConversationSuccess,
  createConversationFailed,
  getMsgs,
  getMsgsSuccess,
  getMsgsFailed,
  sendMsg,
  sendMsgSuccess,
  sendMsgFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getConversationsSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "GET", "/api/conversations");
    action = getConversationsSuccess(response);
  } catch (e) {
    action = getConversationsFailed(e);
  }
  yield put(action);
}
function* createConversationSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", "/api/conversations", payload);
    action = createConversationSuccess(response);
  } catch (e) {
    action = createConversationFailed(e);
  }
  yield put(action);
}
function* sendMsgSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", "/api/messages", payload);
    action = sendMsgSuccess(response);
  } catch (e) {
    action = sendMsgFailed(e);
  }
  yield put(action);
}
function* getMsgsSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/messages?conversationId=" + payload.conversationId
    );
    action = getMsgsSuccess(response);
  } catch (e) {
    action = getMsgsFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getConversations, getConversationsSaga);
  yield takeLatest(createConversation, createConversationSaga);
  yield takeLatest(sendMsg, sendMsgSaga);
  yield takeLatest(getMsgs, getMsgsSaga);
}
