import React from "react";
import { Grid, Typography } from "@mui/material";

import RosterTeamTile from "../../../../../../components/rosterTeamTile/rosterTeamTile";
import TeamIcon from "../../../../../../../assets/profTeam colored.svg";
import classes from "./teams.module.scss";
import GeneralText from "../../../../../../components/generalText/generalText";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function Teams({ data }) {
  return (
    <>
      <Grid className="far-apart-center" width="100%">
        <Typography component="span" sx={{ color: "white", fontSize: 24 }}>
          Teams
        </Typography>
      </Grid>
      <Grid item md={12} sx={{ paddingLeft: "0px !important" }}>
        <Grid container my={1}>
          <Grid item md={12} className={classes.teamsRosterBar}>
            <Grid container>
              {data && data.length ? (
                data.map((x, i) => (
                  <Grid
                    item
                    key={i}
                    spacing={2}
                    md={12 / 2}
                    lg={12 / 3}
                    xl={12 / 4}
                  >
                    <RosterTeamTile
                      id={x._id}
                      link={false}
                      title={x.teamViewName}
                      img={
                        x.teamTitleImage
                          ? BASE_URL + x.teamTitleImage
                          : TeamIcon
                      }
                      kickoutHanlder={""}
                      isKickoutTrue={false}
                      loss={x?.lossCount}
                      win={x?.winsCount}
                    />
                  </Grid>
                ))
              ) : (
                <GeneralText text="No Teams Found!" />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
