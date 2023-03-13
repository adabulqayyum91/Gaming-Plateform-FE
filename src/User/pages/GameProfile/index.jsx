import { Grid, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
  getGame,
  getLadders,
  getTournaments,
  getPublicMatches,
  sendPublicMatchInvite,
} from "./reducers";
import Tournaments from "./components/tournaments";
import Ladders from "./components/ladders";
import Matches from "./components/matches";
import classes from "./index.module.scss";
import SubTabsBar from "../../components/subTabsBar/subTabsBar";
import { allWordsCapitalize } from "../../../utils/apiutils";
import { getUser } from "../Profile/reducers";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";
const TournamentsTabsBar = ["Open", "Free", "Sponsored"];
const LaddersTabsBar = [
  "All",
  "War hammer",
  "Rome",
  "Age of empires",
  "For honor",
];

const Headings = ["Tournaments", "Ladders", "Matches"];

export default function GameProfile() {
  const [tournamentSubtabs, setTournamentSubtabs] = useState("Open");
  const [laddersSubtabs, setLaddersSubtabs] = useState("All");
  const [tournament, setTournament] = useState("Tournaments");
  const dispatch = useDispatch();
  const { game, tournaments, ladders, publicMatches } = useSelector(
    (state) => state.userGameProfile
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(getGame({ id: id }));
  }, []);
  useEffect(() => {
    const gameName = game?.gameName?.toLowerCase();
    dispatch(getTournaments({ game: gameName }));
    dispatch(getLadders({ game: gameName }));
    dispatch(getPublicMatches({ game: gameName }));
  }, [game]);
  const publicMatchInviteHandler = (value) => {
    dispatch(sendPublicMatchInvite(value));
    setTimeout(() => {
      dispatch(getUser());
    }, 500);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid
          item
          md={12}
          className={classes.topSection}
          style={{
            backgroundImage: `url('${BASE_URL + game?.gameImage}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Box className={classes.gameName}>
            {allWordsCapitalize(game?.gameName)}
          </Box>
        </Grid>
        <Grid item md={12} className={classes.centerBar}>
          <Box style={{ float: "left" }}>
            {Headings.map((x, i) => (
              <Typography
                component="span"
                className={
                  tournament === x
                    ? classes.styledTournament
                    : classes.tournamentType
                }
                onClick={() => setTournament(x)}
              >
                {allWordsCapitalize(x)}
              </Typography>
            ))}
          </Box>
          <Box style={{ float: "right" }}>
            {tournament == "tournaments" ? (
              <SubTabsBar
                val={tournamentSubtabs}
                valHanlder={(val) => setTournamentSubtabs(val)}
                types={TournamentsTabsBar}
              />
            ) : tournament == "ladders" ? (
              <SubTabsBar
                val={laddersSubtabs}
                valHanlder={(val) => setLaddersSubtabs(val)}
                types={LaddersTabsBar}
              />
            ) : (
              ""
            )}
          </Box>
        </Grid>
        <Grid item md={12} className={classes.centerBar}>
          <Grid container spacing={2}>
            {tournament === Headings[0] ? (
              <Tournaments data={tournaments} />
            ) : tournament === Headings[1] ? (
              <Ladders data={ladders} />
            ) : (
              <Matches
                data={publicMatches}
                clickHandler={publicMatchInviteHandler}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
