import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

import edit from "../../../../assets/edit.svg";
import profileBgImg from "../../../../assets/profilebackground.png";
import profileSelfImg from "../../../../assets/teamprofile.png";
import ImageUpload from "../../../components/imageUpload/imageUpload";
import { tooltipTrim } from "../../../../utils/apiutils";
import classes from "./topsection.module.scss";
import { capitalize } from "../../../../utils/apisauce";
import { Tooltip } from "@mui/material";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function TopSection({
  profile,
  userProfileImgHandler,
  SampleprofileBgImgHandler,
  setNameEdit,
}) {
  const userStyleProps = {
    bgImage: profile?.backgroundImage
      ? BASE_URL + profile?.backgroundImage
      : profileBgImg,
    profileImg: profile?.profileImage
      ? BASE_URL + profile?.profileImage
      : profileSelfImg,
  };

  return (
    <div className="userprofile-flex-grid-top">
      <div className={classes.userProfileBackground}>
        <PhotoProvider>
          <PhotoView src={userStyleProps.bgImage}>
            <img
              alt=" "
              src={userStyleProps.bgImage}
              className={classes.bgImg}
            />
          </PhotoView>
        </PhotoProvider>
        <div className="userprofile-pic-container">
          <div
            className={(`col `, classes.userprofileImg)}
            style={{
              backgroundImage: `url(${userStyleProps.profileImg})`,
            }}
          >
            <Tooltip
              title={"Image Dim should be around: 140x140"}
              placement="top"
            >
              <div className={classes.profileImgUpload}>
                <ImageUpload
                  imgType="profileImage"
                  imgUploadHanlder={userProfileImgHandler}
                />
              </div>
            </Tooltip>
          </div>
          {/* </PhotoViewer> */}
          <div className="col card-col">
            <div
              className="card userprofile-profilecard"
              style={{ width: "auto" }}
            >
              <div className="card-body userprofile-topbodytext">
                <span className="userprofile-Profiletitle">
                  {profile?.userDetail?.fullName?.length > 14
                    ? tooltipTrim(profile?.userDetail?.fullName ?? "", 20)
                    : capitalize(profile?.userDetail?.fullName)}
                  &nbsp;
                  <button
                    className="userprofile-profileEditbtn"
                    onClick={() => setNameEdit(true)}
                  >
                    <img alt="" src={edit} />
                  </button>
                </span>
                <p className="card-text userprofile-medcardtext userprofile-no-padding"></p>
                <p className="card-text userprofile-bottom"></p>
              </div>
            </div>
          </div>
        </div>
        <Tooltip title={"Image Dim should be around: 1100x200"} placement="top">
          <div className={classes.bgImgUpload}>
            <ImageUpload
              imgType="backgroundImage"
              imgUploadHanlder={SampleprofileBgImgHandler}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
