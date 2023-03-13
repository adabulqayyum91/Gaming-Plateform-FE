import React from "react";
import { Grid, Typography } from "@mui/material";

import addRosterImg from "../../../../../assets/Mask Group 299.svg";
import profileSelfImg from "../../../../../assets/teamprofile.png";
import RosterTeamTile from "./rosterTeamTile";
import GeneralText from "../../../../components/generalText/generalText";
import classes from "./bottomSection.module.scss";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function Roster({ rooster, setFriendModal, kickoutHanlder }) {
  return (
    <Grid item md={12}>
      <Typography component="p" className={classes.rosterName}>
        <span>Roster</span>
        <img alt=" " src={addRosterImg} onClick={setFriendModal} />
      </Typography>
      <Grid container my={1}>
        <Grid item md={12} className={classes.rosterBar}>
          <Grid container spacing={2}>
            {rooster && rooster.length ? (
              rooster.map((x, i) => (
                <Grid item key={i} md={12 / 2} lg={12 / 3} xl={12 / 4}>
                  <RosterTeamTile
                    id={x._id}
                    link=""
                    title={x.fullName}
                    img={
                      x.profileImage
                        ? BASE_URL + x.profileImage
                        : profileSelfImg
                    }
                    kickoutHanlder={kickoutHanlder}
                    loss={x.loss}
                    win={x.wins}
                  />
                </Grid>
              ))
            ) : (
              <Generaltext text="No Roster yet" />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
