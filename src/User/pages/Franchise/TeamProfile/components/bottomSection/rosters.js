import React from "react";
import { Grid, Typography } from "@mui/material";

import addRosterImg from "../../../../../../assets/Mask Group 299.svg";
import profileSelfImg from "../../../../../../assets/teamprofile.png";
import RosterTeamTile from "./rosterTeamTile";
import classes from "./bottomSection.module.scss";
import GeneralText from "../../../../../components/generalText/generalText";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";
const user_id = localStorage.getItem("user_id");

export default function Roster({
  rooster,
  setFriendModal,
  kickoutHanlder,
  createdBy,
  setPerctObj,
}) {
  return (
    <Grid item md={12}>
      <Typography component="p" className={classes.rosterName}>
        <span>Roster</span>{" "}
        {createdBy._id === user_id && (
          <img
            alt=" "
            src={addRosterImg}
            onClick={setFriendModal}
            style={{ cursor: "pointer" }}
          />
        )}
      </Typography>
      <Grid container my={1}>
        <Grid item md={12} className={classes.rosterBar}>
          {rooster.length ? (
            <Grid container>
              {rooster.map((x, i) => (
                <Grid item key={i} md={12 / 2} lg={12 / 3} xl={12 / 4}>
                  <RosterTeamTile
                    link=""
                    id={x._id}
                    title={x.fullName}
                    img={
                      x.profileImage
                        ? BASE_URL + x.profileImage
                        : profileSelfImg
                    }
                    mcd={x.mcd}
                    mprz={x.mprz}
                    prz={x.prz}
                    setPerctObj={setPerctObj}
                    kickoutHanlder={kickoutHanlder}
                    shouldKickOut={createdBy._id === user_id}
                    loss={x.loss}
                    win={x.wins}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <GeneralText text="No Rosters Found!" />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
