import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createFranchise, getFranchise } from "./reducers";
import TopSection from "./components/TopSection/topSection";
import BottomSection from "./components/BottomSection";
import { FranchiseStatus } from "./components/franchiseStatus";
import CreateFranchiseModal from "./components/createFranchiseModal";
import { getUser } from "../../Profile/reducers";
import NotOwnFranchise from "./components/NotOwnFranchise/notOwnFranchise";

const MODE = ["fOwner", "fMember", "simpleUser"];

export default function Franchise() {
  const dispatch = useDispatch();
  const [addFranchise, setAddFranchise] = useState(false);
  const [isRestricted, setIsRestricted] = useState(false);

  const { profile } = useSelector((state) => state.userProfile);
  const { franchise } = useSelector((state) => state.userFranchiseProfile);

  const {
    franchiseTitleImage,
    franchiseName,
    createdDate,
    createdBy,
    approvedStatus,
    isBlock,
  } = franchise;

  useEffect(() => {
    dispatch(getUser());
  }, []);
  useEffect(() => {
    if (profile?.userType?.mode === MODE[1]) {
      dispatch(getFranchise({ franchiseId: profile?.userType?.franchiseId }));
      setIsRestricted(true);
    } else if (profile?.userType?.mode === MODE[2]) {
      return null;
    } else dispatch(getFranchise());
  }, []);
  const createFranchiseHanlder = (values) => {
    dispatch(createFranchise(values));
    setAddFranchise(false);
  };
  const closeHanlder = () => {
    setAddFranchise(false);
  };
  return (
    <>
      <CreateFranchiseModal
        open={addFranchise}
        handleClose={closeHanlder}
        handleCreateFranchise={createFranchiseHanlder}
      />
      {profile?.userType?.mode === MODE[2] ||
      approvedStatus === "disapproved" ||
      approvedStatus === "pending" ||
      isBlock === true ? (
        <>
          {approvedStatus == undefined ? (
            <NotOwnFranchise
              franchise={franchise}
              isBlock={isBlock}
              approvedStatus={approvedStatus}
              setAddFranchise={setAddFranchise}
            />
          ) : (
            <FranchiseStatus
              text={
                approvedStatus !== "approved"
                  ? `Your Grand Prix status is currently ${approvedStatus?.toUpperCase()}, Please contact admin through chat`
                  : isBlock === true
                  ? `Your Grand Prix status is currently BLOCKED, Please contact admin through contact us page`
                  : `You don't own any Grand Prix`
              }
            />
          )}
        </>
      ) : (
        <>
          <TopSection
            franchiseName={franchiseName}
            franchiseTitleImg={franchiseTitleImage}
            date={createdDate}
            owner={createdBy?.name}
          />
          <BottomSection isRestricted={isRestricted} />
        </>
      )}
    </>
  );
}
