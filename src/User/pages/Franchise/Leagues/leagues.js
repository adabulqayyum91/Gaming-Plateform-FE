import React, { useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import SmartCard from "../../../components/smartCard/smartCard";
import classes from "./leagues.module.scss";
// import LeagueResults from "./components/leaguesResults";
import { useDispatch, useSelector } from "react-redux";
import { getFranchiseLeagues, setLeagueId } from "./reducers";
import { getFranchiseGames } from "../Tournaments/reducers";
import GeneralText from "../../../components/generalText/generalText";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function Leagues({ id, franchiseId, isRestricted }) {
  const dispatch = useDispatch();

  const { leagues } = useSelector((state) => state.userFranchiseLeagues);

  useEffect(() => {
    dispatch(getFranchiseLeagues());
    dispatch(getFranchiseGames());
  }, []);

  const addLeagueIdHanlder = (id) => {
    dispatch(setLeagueId(id));
  };

  return (
    <>
      <Grid className="far-apart-center" width="100%">
        <Typography component="span" sx={{ color: "white", fontSize: 24 }}>
          Leagues
        </Typography>
      </Grid>
      <Grid item md={12} sx={{ paddingLeft: "0px !important" }}>
        <Grid container my={1}>
          <Grid item md={12} className={classes.leaguesRosterBar}>
            <Grid container spacing={2} justifyContent="left">
              {leagues.length ? (
                leagues?.map((x, i) => (
                  <Grid
                    item
                    key={i}
                    md={12 / 2}
                    lg={12 / 3}
                    xl={12 / 4}
                    display="flex"
                    justifyContent="center"
                    onClick={() => addLeagueIdHanlder(x._id)}
                  >
                    <SmartCard
                      key={i}
                      link={"/user/grand-prix/league/" + x._id}
                      img={
                        x.leagueTitleImage
                          ? BASE_URL + x.leagueTitleImage
                          : null
                      }
                      name={x.leagueName}
                      prizePool={x.prize}
                      teamSize={x.totalTeams}
                      entryFee={x.entryFee}
                      date={"Staring Date: " + x.startingDate}
                      registeredTeams={x.registeredTeams}
                      time={""}
                    />
                  </Grid>
                ))
              ) : (
                <GeneralText text="No Leagues Found!" />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      )
    </>
  );
}
