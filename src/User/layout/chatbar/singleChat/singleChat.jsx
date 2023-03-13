import React, { useEffect, useRef, useState, useContext } from "react";
import { Box, InputBase } from "@mui/material";
import { format } from "timeago.js";

import leftShevronIcon from "../../../../assets/Mask Group 264.svg";
import profileIconImg from "../../../../assets/teamprofile.png";
import sendMessageIcon from "../../../../assets/sendMessageIcon.svg";
import { allWordsCapitalize } from "../../../../utils/apiutils";
import { Context } from "../index";
import classes from "./singleChat.module.scss";

const loggedinId = localStorage.getItem("user_id");
const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

const SingleChat = ({
  msgs,
  setChatOpen,
  currentChat,
  dispatchMsgHandler,
  profile,
  searchedUserProf,
}) => {
  const { friends, onlineUsers } = useContext(Context);
  const [msgVal, setMsgVal] = useState("");
  const [user, setUser] = useState({});
  const scrollRef = useRef();

  useEffect(() => {
    const friendId = currentChat.members.find((m) => m !== loggedinId);
    const res = friends.filter((x) => x._id === friendId);
    setUser(res[0]);
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [msgs]);

  const header = () => {
    const friendIdFinder = () => {
      const friendId = currentChat?.members.find((m) => m !== loggedinId);
      return friendId;
    };
    return (
      <Box className={classes.headerContainer}>
        <img
          alt=""
          src={leftShevronIcon}
          onClick={() => setChatOpen(false)}
          style={{ cursor: "pointer" }}
        />
        <div className={classes.headIcon}>
          <div className={classes.msgPicOut}>
            <img
              alt=""
              className={classes.msgPic}
              src={
                user?.profileImage
                  ? BASE_URL + user.profileImage
                  : profileIconImg
              }
            />
            <span
              className={
                onlineUsers.includes(friendIdFinder())
                  ? classes.online
                  : classes.offline
              }
            ></span>
          </div>
          <span style={{ paddingLeft: "10px" }}>
            {allWordsCapitalize(
              user?.fullName ?? searchedUserProf?.profile?.userDetail?.fullName
            )}
          </span>
        </div>
      </Box>
    );
  };
  const innerChat = () => {
    const { profileImage } = profile;
    let ownerProfImage = profileImage
      ? BASE_URL + profileImage
      : profileIconImg;
    let friendProfImage = user?.profileImage
      ? BASE_URL + user?.profileImage
      : profileIconImg;
    return (
      <div className={classes.chatContainer}>
        {msgs.length &&
          msgs.map((x, i) => {
            return (
              <div className={classes.msgRow} ref={scrollRef} key={i}>
                <img
                  alt=""
                  className={classes.msgPic}
                  src={
                    x.sender === loggedinId ? ownerProfImage : friendProfImage
                  }
                />
                <p className={classes.msgBox}>
                  <span className={classes.msgText}>{x.text}</span> &nbsp;
                  <span className={classes.msgTime}>{format(x.createdAt)}</span>
                </p>
              </div>
            );
          })}
      </div>
    );
  };
  const footer = () => {
    const sendMsgHandler = (e) => {
      if (e.key == "Enter" && msgVal !== "") {
        dispatchMsgHandler({
          text: msgVal,
        });
        setMsgVal("");
      }
    };
    const sendClickhandler = () => {
      if (msgVal) {
        dispatchMsgHandler({
          text: msgVal,
        });
        setMsgVal("");
      }
    };

    return (
      <Box className={classes.footer}>
        <InputBase
          placeholder={"Enter your message "}
          classes={{
            root: classes.usetableInput,
            input: classes.inputBaseInput,
          }}
          varient="outlined"
          value={msgVal}
          onKeyDown={(e) => sendMsgHandler(e)}
          onChange={(e) => setMsgVal(e.target.value)}
          endAdornment={
            <img
              alt=""
              onClick={sendClickhandler}
              src={sendMessageIcon}
              style={{ cursor: "pointer" }}
            />
          }
        />
      </Box>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.content}>
          {header()}
          {innerChat()}
          {footer()}
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
