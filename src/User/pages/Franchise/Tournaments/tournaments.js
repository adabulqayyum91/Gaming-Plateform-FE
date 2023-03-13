import React, { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";

import SmartCard from "../../../components/smartCard/smartCard";
import { getFranchiseGames, setTournamentId } from "./reducers";
import { useDispatch, useSelector } from "react-redux";
import { getFranchiseTournaments } from "./reducers";
import classes from "./tournaments.module.scss";
import GeneralText from "../../../components/generalText/generalText";
import FilterBar from "../../../components/platformTypeBar/platformTypeBar";

const Types = ["All", "Joined"];
const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function Tournaments({ franchiseId, isRestricted }) {
  const [filter, setFilter] = useState("All");
  const dispatch = useDispatch();
  // const [selectedButton, setSelectedButton] = useState("Add Tournament");
  // const [addTournament, setAddTournament] = useState(false);

  const { tournaments, games } = useSelector(
    (state) => state.userFranchiseTournaments
  );

  useEffect(() => {
    dispatch(getFranchiseTournaments({ franchiseId: franchiseId }));
    if (!isRestricted) {
      dispatch(getFranchiseGames());
    }
  }, []);

  const addTournamentIdHanlder = (id) => {
    dispatch(setTournamentId(id));
  };

  const joinedTours = tournaments.filter(
    (tour) => tour.tournamentJoined === true
  );
  const _tours = filter === "Joined" ? joinedTours : tournaments;

  return (
    <>
      <Grid className="far-apart-center" width="100%">
        <Typography component="span" sx={{ color: "white", fontSize: 24 }}>
          Tournaments
        </Typography>
        <Box>
          <FilterBar
            types={Types}
            val={filter}
            valHanlder={(val) => setFilter(val)}
          />
        </Box>
      </Grid>
      <Grid item md={12} sx={{ paddingLeft: "0px !important" }}>
        <Grid container my={1}>
          <Grid item md={12} className={classes.tournamentsRosterBar}>
            {_tours.length ? (
              <Grid container spacing={2} justifyContent="left">
                {_tours.map((x, i) => (
                  <Grid
                    item
                    key={i}
                    md={12 / 2}
                    lg={12 / 3}
                    xl={12 / 4}
                    display="flex"
                    justifyContent="center"
                    onClick={() => addTournamentIdHanlder(x._id)}
                  >
                    <SmartCard
                      key={i}
                      link={"/user/grand-prix/tournament/" + x._id}
                      img={
                        x.tournamentTitleImage
                          ? BASE_URL + x.tournamentTitleImage
                          : null
                      }
                      name={x.tournamentName}
                      prizePool={x.prize}
                      teamSize={x.teamSize}
                      entryFee={x.entryFee}
                      date={x.tournamentDate}
                      time={x.tournamentTime}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <GeneralText text="No Tournaments Found!" />
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
