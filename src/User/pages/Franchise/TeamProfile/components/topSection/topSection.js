import React from "react";
import { useNavigate } from "react-router";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import edit from "../../../../../../assets/edit.svg";
import profileBgImg from "../../../../../../assets/profilebackground.png";
import profileSelfImg from "../../../../../../assets/teamprofile.png";
import delImg from "../../../../../../assets/Mask Group 278.svg";
import leaveImg from "../../../../../../assets/Mask Group 279.svg";
import { dateFormate } from "../../../../../../utils/apiutils";
import TopSectionButton from "./topSecButton";
import { tooltipTrim } from "../../../../../../utils/apiutils";
import classes from "./topSection.module.scss";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function TopSection({
  profile,
  createdBy,
  deleteTeamHandler,
  leaveTeamHandler,
  setIsDeletedModal,
  isMember,
}) {
  const navigate = useNavigate();
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
    <div className="frenchTeamprofile-flex-grid-top">
      <div
        className={classes.teamProfileBackground}
        style={{
          backgroundImage: `url(${teamStyleProps.bgImage})`,
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          className={classes.backChevron}
        >
          <ChevronLeftIcon sx={{ color: "#F26826", pb: "3px" }} />
        </IconButton>
        <div className="frenchTeamprofile-pic-container">
          <div
            className={(`col `, classes.teamprofileImg)}
            style={{
              backgroundImage: `url(${teamStyleProps.profileImg})`,
            }}
          ></div>
          <div className="col card-col">
            <div
              className="card frenchTeamprofile-profilecard"
              style={{ maxWidth: "22rem" }}
            >
              <div className="card-body frenchTeamprofile-topbodytext">
                <span className="frenchTeamprofile-Profiletitle">
                  {tooltipTrim(profile?.teamViewName ?? "", 14)}
                  &nbsp;
                </span>
                <p className="card-text frenchTeamprofile-medcardtext frenchTeamprofile-no-padding">
                  Created at {dateFormate(profile?.createdAt)}
                </p>
                <p className="card-text frenchTeamprofile-bottom">
                  {profile?.rooster.length} Members
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.topsecButtons}>
          {createdBy?._id === user_id ? (
            <TopSectionButton
              icon={delImg}
              title={"Delete Team"}
              clickHandler={() => setIsDeletedModal(true)}
            />
          ) : (
            isMember && (
              <TopSectionButton
                icon={leaveImg}
                title={"Leave Team"}
                clickHandler={leaveTeamHandler}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
