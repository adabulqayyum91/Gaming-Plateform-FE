import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
    conversations: [],
    msgs: [],
    currentChat: {},
    chatOpen: false,
  },
  reducers: {
    createConversation: (state) => {
      state.loading = true;
    },
    createConversationSuccess: (state, { payload }) => {
      state.loading = false;
      let conv = payload.conversationsData;
      if (!state.conversations.includes(conv._id))
        state.conversations.push(conv);
      state.currentChat = conv;
      state.chatOpen = true;
    },
    createConversationFailed: (_, { payload }) => {
      NotificationManager.error(payload.message);
    },
    chatOpenReducer: (state, { payload }) => {
      state.currentChat = payload.conv;
      state.chatOpen = true;
    },
    singleChatOpenReducer: (state, { payload }) => {
      state.chatOpen = payload;
    },
    getConversations: (state) => {
      state.loading = false;
    },
    getConversationsSuccess: (state, { payload }) => {
      state.loading = true;
      state.conversations = payload.conversationsData;
    },
    getConversationsFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    sendMsg: (state) => {
      state.loading = false;
    },
    sendMsgSuccess: (state, { payload }) => {
      state.loading = true;
      state.msgs = payload.messagesData;
    },
    sendMsgFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    //local setter
    setMsgs: (state, { payload }) => {
      state.msgs.push(payload);
    },
    getMsgs: (state) => {
      state.loading = false;
    },
    getMsgsSuccess: (state, { payload }) => {
      state.loading = true;
      state.msgs = payload.messagesData;
    },
    getMsgsFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getConversations,
  getConversationsSuccess,
  getConversationsFailed,
  chatOpenReducer,
  singleChatOpenReducer,
  createConversation,
  createConversationSuccess,
  createConversationFailed,
  setMsgs,
  getMsgs,
  getMsgsSuccess,
  getMsgsFailed,
  sendMsg,
  sendMsgSuccess,
  sendMsgFailed,
} = slice.actions;
export default slice.reducer;
