import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import Teams from "./TabSections/teams";
import CenterBar from "./CenterBar/centerBar";
import Tournaments from "../../../Tournaments/tournaments";
import Leagues from "../../../Leagues/leagues";
import { allWordsCapitalize } from "../../../../../../utils/apiutils";
import classes from "./index.module.scss";
import { useParams } from "react-router-dom";

let Tabs = ["Teams", "Tournaments", "Leagues"];

export default function Index({ userFranchMode }) {
  const { id } = useParams();
  const [tab, setTab] = useState("Teams");

  const { franchise } = useSelector(
    (state) => state.userNonOwnerFranchiseProfile
  );
  if (userFranchMode === "simpleUser") {
    Tabs = ["Teams"];
  }
  return (
    <>
      <CenterBar
        matches={franchise?.matches}
        totalTeams={franchise?.totalTeams}
        franchiseStatus={franchise?.franchiseStatus}
        about={franchise?.about}
      />
      <Box style={{ float: "left" }}>
        {Tabs.map((x, i) => (
          <Typography
            component="span"
            className={tab === x ? classes.styledTab : classes.tabType}
            onClick={() => setTab(x)}
          >
            {allWordsCapitalize(x)}
          </Typography>
        ))}
      </Box>
      <Grid item md={12}>
        <Grid container spacing={2} className={classes.tabsSection}>
          {userFranchMode === "simpleUser" ? (
            <Teams data={franchise.franchiseTeams} />
          ) : (
            <>
              {tab === Tabs[0] ? (
                <Teams data={franchise.franchiseTeams} />
              ) : tab === Tabs[1] ? (
                <Tournaments
                  franchiseId={franchise._id}
                  isRestricted={franchise._id === id}
                />
              ) : tab === Tabs[2] ? (
                <Leagues
                  franchiseId={franchise._id}
                  isRestricted={franchise._id === id}
                />
              ) : null}
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
