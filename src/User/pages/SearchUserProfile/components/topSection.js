import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { PhotoProvider, PhotoView } from "react-photo-view";

import profileBgImg from "../../../../assets/profilebackground.png";
import msgIcon from "../../../../assets/message icon.svg";
import profileSelfImg from "../../../../assets/teamprofile.png";
import friendReqIcon from "../../../../assets/Mask Group 10.svg";
import { tooltipTrim } from "../../../../utils/apiutils";
import TopSectionButton from "../../TeamProfile/components/topSection/topSecButton";
import classes from "./topsection.module.scss";
import { capitalize } from "../../../../utils/apisauce";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function TopSection({
  profile,
  friendReqHandler,
  messageHandler,
}) {
  const userStyleProps = {
    bgImage: profile?.backgroundImage
      ? BASE_URL + profile?.backgroundImage
      : profileBgImg,
    profileImg: profile?.profileImage
      ? BASE_URL + profile?.profileImage
      : profileSelfImg,
  };
  const FR = profile?.friendRequest;

  return (
    <Grid item md={12} className={classes.searchedTopSection}>
      <Grid container className={classes.topSecContent}>
        <PhotoProvider>
          <PhotoView src={userStyleProps.bgImage}>
            <img
              alt=" "
              src={userStyleProps.bgImage}
              className={classes.searchedBgImage}
            />
          </PhotoView>
        </PhotoProvider>
        <Grid item className={classes.profileImageContainer}>
          <Box className={classes.profileImgSec}>
            <img
              alt=" "
              src={userStyleProps.profileImg}
              className={classes.searchedProfileImage}
            />
            <Box className={classes.nameStrip}>
              {profile?.userDetail?.fullName?.length > 14
                ? tooltipTrim(profile?.userDetail?.fullName ?? "", 18)
                : capitalize(profile?.userDetail?.fullName)}
              <Typography color="#F26826">
                {profile?.userDetail.friends} Friends
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item className={classes.joinButton}>
          {FR == "accepted" ? (
            <TopSectionButton
              icon={msgIcon}
              title="Send Message"
              disabled={false}
              clickHandler={messageHandler}
            />
          ) : (
            <TopSectionButton
              icon={friendReqIcon}
              title={FR === "sent" ? "Cancel" : "Send Friend Request"}
              // disabled={FR === "sent" ? true : false}
              clickHandler={() =>
                friendReqHandler(FR === "sent" ? "cancelled" : "accepted")
              }
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
