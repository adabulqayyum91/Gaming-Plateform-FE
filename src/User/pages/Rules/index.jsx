import React, { useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import FantasyLeagues from "./components/FantasyLeagues";
import General from "./components/General";
import LeaguesAndLadders from "./components/LeaguesAndLadders";
import { allWordsCapitalize } from "../../../utils/apiutils";
import classes from "./rulesIndex.module.scss";

const Tabs = ["General", "Leagues And Ladders", "Fantasy Leagues"];

export default function Rules() {
  const [tab, setTab] = useState("General");

  return (
    <>
      <Grid>
        <Box>
          {Tabs.map((x, i) => (
            <Typography
              key={x}
              component="span"
              onClick={() => setTab(x)}
              className={tab == x ? classes.styledTab : classes.tabType}
            >
              {allWordsCapitalize(x)}
            </Typography>
          ))}
        </Box>
        <Box sx={{ marginTop: "50px" }}>
          {tab == "General" ? (
            <General />
          ) : tab == "Leagues And Ladders" ? (
            <LeaguesAndLadders />
          ) : tab == "Fantasy Leagues" ? (
            <FantasyLeagues />
          ) : null}
        </Box>
      </Grid>
    </>
  );
}
