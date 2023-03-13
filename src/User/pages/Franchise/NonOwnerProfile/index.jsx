import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFranchise, sendTryoutReq } from "./reducers";
import TopSection from "./components/TopSection/topSection";
import BottomSection from "./components/BottomSection";
import { useParams } from "react-router";
import TryoutModal from "./components/TryoutModal/tryoutModal";

export default function NonOwnerProfileCopy() {
  const dispatch = useDispatch();
  const [tryoutOpen, setTryoutOpen] = useState(false);

  const { franchise } = useSelector(
    (state) => state.userNonOwnerFranchiseProfile
  );
  const { profile } = useSelector((state) => state.userProfile);
  const { franchiseTitleImage, franchiseName, createdDate, createdBy, tryout } =
    franchise;

  const { id } = useParams();
  const userFranchMode = profile?.userType?.mode;

  useEffect(() => {
    dispatch(getFranchise({ franchiseId: id }));
  }, []);

  const sendTryoutHandler = (values) => {
    dispatch(sendTryoutReq({ ...values, franchiseId: id }));
    setTryoutOpen(false);
  };
  const closeHanlder = () => {
    setTryoutOpen(false);
  };

  return (
    <>
      <TryoutModal
        teams={franchise?.franchiseTeams}
        open={tryoutOpen}
        handleClose={closeHanlder}
        handleSendTryout={sendTryoutHandler}
      />
      <TopSection
        franchiseName={franchiseName}
        franchiseTitleImg={franchiseTitleImage}
        date={createdDate}
        owner={createdBy?.name}
        userFranchMode={userFranchMode}
        setTryoutOpen={setTryoutOpen}
        tryout={tryout}
      />
      <BottomSection userFranchMode={userFranchMode} />
    </>
  );
}
