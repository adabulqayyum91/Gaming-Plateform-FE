import React, { useEffect, useState, useContext } from "react";

import profileIconImg from "../../../../../assets/teamprofile.png";
import { allWordsCapitalize } from "../../../../../utils/apiutils";
import { Context } from "../../index";
import classes from "./conversation.module.scss";

const loggedinId = localStorage.getItem("user_id");
const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function ({
  chatBarOpen,
  conversation,
  // friends,
  // onlineUsers
}) {
  const [user, setUser] = useState({});
  const { friends, onlineUsers } = useContext(Context);

  useEffect(() => {
    const friendId = conversation?.members.find((m) => m !== loggedinId);
    const res = friends.filter((x) => x._id === friendId);
    setUser(res[0]);
  }, [loggedinId, conversation]);

  const friendIdFinder = () => {
    const friendId = conversation?.members.find((m) => m !== loggedinId);
    return friendId;
  };
  return (
    <div className={classes.users}>
      {user?.fullName && (
        <div className={classes.convPicOut}>
          <img
            alt=""
            className={classes.convPic}
            src={
              user?.profileImage ? BASE_URL + user.profileImage : profileIconImg
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
      )}
      {chatBarOpen && (
        <span className={classes.userName}>
          {allWordsCapitalize(user?.fullName)}
        </span>
      )}
    </div>
  );
}
