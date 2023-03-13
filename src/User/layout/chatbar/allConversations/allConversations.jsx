import React, { useState, useEffect, useContext } from "react";
import { InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import cx from "classnames";

import Conversation from "./conversation/conversation";
import leftShevronIcon from "../../../../assets/Mask Group 264.svg";
import rightShevronIcon from "../../../../assets/rightShevron.svg";
import chatOpenIcon from "../../../../assets/Mask Group 281.svg";
import { Context } from "../index";

import classes from "./allConversations.module.scss";
const loggedinId = localStorage.getItem("user_id");

const AllConversations = ({
  chatOpenHandler,
  conversations,
  // friends,
  // onlineUsers,
}) => {
  const [chatBarOpen, setChatBarOpen] = useState(false);
  const [searchedConversations, setSearchedConversations] = useState([]);
  const [searchConvValue, setSearchConvValue] = useState("");
  const { friends } = useContext(Context);

  const conversationHandler = (val) => {
    setSearchConvValue(val);
    if (!val) {
      setSearchedConversations([...conversations]);
      return;
    }
  };
  useEffect(() => {
    if (searchConvValue) {
      let friendIds = friends.map((x) => {
        if (x.fullName.toLowerCase().includes(searchConvValue.toLowerCase()))
          return x._id;
      });
      let searchConvs = conversations.map((conv) => {
        const memberId = conv.members.find((m) => m !== loggedinId);
        if (friendIds.find((x) => x === memberId)) return conv;
      });
      setSearchedConversations(searchConvs);
    }
  }, [searchConvValue]);

  const SingleConvComp = (conversations) => {
    return conversations.map((conversation, i) => (
      <button
        key={i}
        style={{ width: "100%" }}
        className={cx(classes.menuButton1, classes.matButton)}
        onClick={() => chatOpenHandler({ ...conversation })}
      >
        {friends?.length && (
          <Conversation
            chatBarOpen={chatBarOpen}
            conversation={conversation}
            // friends={friends}
            // onlineUsers={onlineUsers}
          />
        )}
      </button>
    ));
  };
  return (
    <div className={classes.container}>
      <div
        className={cx(
          classes.messageside,
          !chatBarOpen ? classes.initialBar : classes.afterBar
        )}
      >
        <div className={classes.chatHeader}>
          <button
            className={cx(
              classes.menuButton1,
              classes.toggle1,
              classes.matButton
            )}
          >
            {!chatBarOpen && (
              <img
                alt=""
                style={{ marginLeft: "-28%" }}
                src={leftShevronIcon}
                onClick={() => setChatBarOpen((val) => !val)}
              />
            )}
            &nbsp;
            <img alt="" src={chatOpenIcon} />
          </button>
          {chatBarOpen && (
            <>
              <InputBase
                placeholder={"Search friends chat"}
                classes={{
                  root: classes.usetableInput,
                  input: classes.inputBaseInput,
                }}
                variant="standard"
                autoFocus={true}
                value={searchConvValue}
                onChange={(e) => conversationHandler(e.target.value)}
                startAdornment={<SearchIcon />}
              />
              <img
                alt=""
                className={classes.rightShevron}
                src={rightShevronIcon}
                onClick={() => setChatBarOpen((val) => !val)}
              />
            </>
          )}
        </div>
        {SingleConvComp(
          searchedConversations.length ? searchedConversations : conversations
        )}
      </div>
    </div>
  );
};

export default AllConversations;
