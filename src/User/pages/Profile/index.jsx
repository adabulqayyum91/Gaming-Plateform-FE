import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import NameEdit from "./Modal/nameEdit";
import AboutEdit from "../../components/aboutEditModal/aboutEdit";
import TopSection from "./components/topSection";
import BottomSection from "./components/bottomSection/bottomSection";
import "./index.css";
import {
  getUser,
  updateProfileBg,
  updateProfileImg,
  updateUser,
} from "./reducers";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.userProfile);
  const [nameEdit, setNameEdit] = useState(false);
  const [aboutEdit, setAboutEdit] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    console.log({ userToken });
    if (userToken) {
      dispatch(getUser());
    }
    else {
      navigate("/auth/login");
    }
  }, []);

  const { profile } = userProfile;

  const handleClose = () => {
    setAboutEdit(false);
    setNameEdit(false);
  };
  const handleUpdateUser = (val) => {
    dispatch(updateUser(val));
    setAboutEdit(false);
    setNameEdit(false);
  };
  const userProfileImgHandler = (e, type) => {
    dispatch(updateProfileImg(e));
  };
  const SampleprofileBgImgHandler = (e) => {
    dispatch(updateProfileBg(e));
  };

  return (
    <>
      <NameEdit
        fullName={profile?.userDetail?.fullName}
        open={nameEdit && true}
        handleClose={handleClose}
        handleUpdateUser={handleUpdateUser}
      />
      <AboutEdit
        about={profile?.userDetail?.about}
        open={aboutEdit && true}
        handleClose={handleClose}
        handleUpdateUser={handleUpdateUser}
      />
      <div className="userprofile-containerWrapper ">
        <TopSection
          profile={profile}
          SampleprofileBgImgHandler={SampleprofileBgImgHandler}
          userProfileImgHandler={userProfileImgHandler}
          setNameEdit={setNameEdit}
        />
        {profile && (
          <BottomSection profile={profile} setAboutEdit={setAboutEdit} />
        )}
      </div>
    </>
  );
};

export default Profile;
