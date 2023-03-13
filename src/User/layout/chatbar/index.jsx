import React, { useEffect, useState, useRef, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import io from 'socket.io-client';

import SingleChat from './singleChat/singleChat';
import AllConversations from './allConversations/allConversations';
import { getFriends } from '../../pages/TeamProfile/reducers';
import {
  getMsgs,
  sendMsg,
  setMsgs,
  getConversations,
  chatOpenReducer,
  singleChatOpenReducer,
} from './reducers';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const SocketUrl = `ws${BASE_URL.substr(BASE_URL.indexOf(':'))}`;
const loggedinId = localStorage.getItem('user_id');

const Context = createContext();

const Chat = () => {
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatOpenLocalState, setChatOpenLocalState] = useState(false);
  const socket = useRef();

  const dispatch = useDispatch();
  const { conversations, msgs, chatOpen, currentChat } = useSelector(
    (state) => state.userChat
  );
  const { friends } = useSelector((state) => state.userTeamProfile);
  const { profile } = useSelector((state) => state.userProfile);
  const searchedUserProf = useSelector((state) => state.userSearch);

  useEffect(() => {
    socket.current = io(BASE_URL);
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setChatOpenLocalState(chatOpen);
    }, 600);
  }, [chatOpen]);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      dispatch(setMsgs(arrivalMessage));
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    socket.current.emit('addUser', { senderId: loggedinId });
    socket.current.on('getUsers', (users) => {
      let usersId = users.map((user) => user.userId);
      setOnlineUsers([...usersId]);
    });
  }, [profile]);
  //get conversations
  useEffect(() => {
    dispatch(getConversations());
    dispatch(getFriends());
  }, [loggedinId, currentChat]);

  useEffect(() => {
    dispatch(getMsgs({ conversationId: currentChat._id }));
  }, [currentChat]);

  const chatOpenHandler = (conv) => {
    dispatch(chatOpenReducer({ conv: conv }));
  };
  const dispatchMsgHandler = (msgObj) => {
    const receiverId = currentChat.members.find(
      (member) => member !== loggedinId
    );
    socket.current.emit('sendMessage', {
      senderId: loggedinId,
      receiverId,
      text: msgObj.text,
    });
    dispatch(
      sendMsg({
        conversationId: currentChat._id,
        ...msgObj,
      })
    );
  };
  const setChatOpen = (val) => {
    dispatch(singleChatOpenReducer(val));
  };

  return (
    <Grid
      className='seventh-step'
      item
      md={1}
      sx={{ zIndex: '19', overFlow: 'hidden' }}
    >
      <Context.Provider
        value={{
          friends: friends,
          onlineUsers: onlineUsers,
        }}
      >
        {!chatOpenLocalState ? (
          <AllConversations
            conversations={conversations}
            chatOpenHandler={chatOpenHandler}
          />
        ) : (
          <SingleChat
            msgs={msgs}
            setChatOpen={setChatOpen}
            currentChat={currentChat}
            dispatchMsgHandler={dispatchMsgHandler}
            profile={profile}
            searchedUserProf={searchedUserProf}
          />
        )}
      </Context.Provider>
    </Grid>
  );
};

export { Context };
export default Chat;
