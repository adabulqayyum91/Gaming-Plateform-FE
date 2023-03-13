import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

import edit from "../../../../../assets/edit.svg";
import profileBgImg from "../../../../../assets/profilebackground.png";
import profileSelfImg from "../../../../../assets/teamprofile.png";
import delImg from "../../../../../assets/Mask Group 278.svg";
import leaveImg from "../../../../../assets/Mask Group 279.svg";
import ImageUpload from "../imageUpload/imageUpload";
import { dateFormate } from "../../../../../utils/apiutils";
import TopSectionButton from "./topSecButton";
import { tooltipTrim } from "../../../../../utils/apiutils";
import classes from "./topSection.module.scss";
import { Tooltip } from "@mui/material";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function TopSection({
  profile,
  teamProfileImgHandler,
  SampleprofileBgImgHandler,
  setNameEdit,
  teamId,
  deleteTeamHandler,
  leaveTeamHandler,
  setIsDeletedModal,
}) {
  const teamStyleProps = {
    bgImage: profile?.teamCoverImage
      ? BASE_URL + profile?.teamCoverImage
      : profileBgImg,
    profileImg: profile?.teamTitleImage
      ? BASE_URL + profile?.teamTitleImage
      : profileSelfImg,
  };
  const user_id = localStorage.getItem("user_id");

  return (
    <div className="teamprofile-flex-grid-top">
      <div className={classes.teamProfileBackground}>
        <img
          alt=" "
          src={teamStyleProps.bgImage}
          className={classes.bgImgClass}
        />
        <div className="teamprofile-pic-container">
          <div
            className={(`col `, classes.teamprofileImg)}
            style={{
              backgroundImage: `url(${teamStyleProps.profileImg})`,
            }}
          >
            <Tooltip
              title={"Image Dim should be around: 140x140"}
              placement="top"
            >
              <div className={classes.profileImgUpload}>
                {profile?.leader._id === user_id && (
                  <ImageUpload
                    imgType="teamTitleImage"
                    imgUploadHanlder={teamProfileImgHandler}
                    id={teamId}
                  />
                )}
              </div>
            </Tooltip>
          </div>
          <div className="col card-col">
            <div
              className="card teamprofile-profilecard"
              style={{ maxWidth: "19rem !important" }}
            >
              <div className="card-body teamprofile-topbodytext">
                <span className="teamprofile-Profiletitle">
                  {tooltipTrim(profile?.teamViewName ?? "", 14)}
                  &nbsp;
                  {profile?.leader._id === user_id && (
                    <button
                      className="teamprofile-profileEditbtn"
                      onClick={() => setNameEdit(true)}
                    >
                      <img alt="" src={edit} />
                    </button>
                  )}
                </span>
                <p className="card-text teamprofile-medcardtext teamprofile-no-padding">
                  Created at {dateFormate(profile?.createdAt)}
                </p>
                <p className="card-text teamprofile-bottom">
                  {profile?.rooster.length} Members
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.bgImgUpload}>
          {profile?.leader._id === user_id && (
            <ImageUpload
              imgType="teamCoverImage"
              imgUploadHanlder={SampleprofileBgImgHandler}
              id={teamId}
            />
          )}
        </div>
        <div className={classes.topsecButtons}>
          {profile?.leader._id === user_id && (
            <TopSectionButton
              icon={delImg}
              title={"Delete Team"}
              clickHandler={() => setIsDeletedModal(true)}
            />
          )}
          <TopSectionButton
            icon={leaveImg}
            title={"Leave Team"}
            clickHandler={leaveTeamHandler}
          />
        </div>
      </div>
    </div>
  );
}
