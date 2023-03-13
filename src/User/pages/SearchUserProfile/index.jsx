import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import TopSection from "./components/topSection";
import BottomSection from "./components/bottomSection/bottomSection";
import { getUser, sendFriendReq, deleteFriendReq } from "./reducers";
import { createConversation } from "../../layout/chatbar/reducers";

const SearchUserProfile = () => {
  const { id } = useParams();
  const { profile } = useSelector((state) => state.userSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser({ id: id }));
  }, [id]);
  const friendReqHandler = (type) => {
    if (type === "accepted") {
      dispatch(sendFriendReq({ friendId: profile._id }));
    } else {
      dispatch(deleteFriendReq({ friendId: profile._id }));
    }
  };
  const messageHandler = () => {
    dispatch(
      createConversation({
        receiverId: id,
      })
    );
  };
  return (
    <div>
      {profile && (
        <TopSection
          profile={profile}
          friendReqHandler={friendReqHandler}
          messageHandler={messageHandler}
        />
      )}
      {profile && <BottomSection profile={profile} />}
    </div>
  );
};

export default SearchUserProfile;
