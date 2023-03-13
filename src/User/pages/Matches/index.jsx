import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getMatches,
  createMatche,
  getMyTournaments,
  getMyLadders,
} from "./reducers";
import classes from "./index.module.scss";
import HorizontalScroll from "../../../common/horizontalScroll/horizontalScroll";
import DynamicButton from "../../components/dynamicButton/dynamicButton";
import SmartCard from "../../components/smartCard/smartCard";
import AddMatchModal from "./components/addMatchModal";
import { getGames } from "../Games/reducers";
import { getFriends } from "../TeamProfile/reducers";
import MatchCard from "../../components/matchCard/matchCard";
import { getUser } from "../Profile/reducers";
import GeneralText from "../../components/generalText/generalText";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function MyMatches() {
  const dispatch = useDispatch();
  const [createMatch, setCreateMatch] = useState(false);

  const {
    matchesData: { matches, mytournaments, myladders },
  } = useSelector((state) => state.userMatches);
  const { games } = useSelector((state) => state.userGames);
  const { friends } = useSelector((state) => state.userTeamProfile);

  useEffect(() => {
    dispatch(getMatches());
    dispatch(getMyTournaments());
    dispatch(getMyLadders());
    dispatch(getGames({ query: "All" }));
    dispatch(getFriends());
  }, []);
  const createMatchHanlder = (values) => {
    dispatch(createMatche(values));
    setTimeout(() => {
      dispatch(getUser());
    }, 700);
    setCreateMatch(false);
  };
  const handleClose = () => {
    setCreateMatch(false);
  };

  return (
    <>
      <AddMatchModal
        open={createMatch}
        handleClose={handleClose}
        handleCreateMatch={createMatchHanlder}
        games={games}
        friends={friends}
      />
      <Box>
        <Grid
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component="span"
            sx={{ color: "white", fontSize: 24, fontWeight: "bold" }}
          >
            My Matches
          </Typography>
          <Box>
            <DynamicButton
              title="Create Match"
              clickHandler={() => setCreateMatch(true)}
              pl="20px"
              pr="20px"
              pt="5px"
              pb="5px"
              color={true}
            />
          </Box>
        </Grid>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container mt={2} className={classes.tournamentsScroll}>
            {/* <HorizontalScroll> */}
            {matches.length ? (
              matches.map((x, i) => {
                return (
                  x.status !== "expired" &&
                  x.status !== "cancelled" && (
                    <Grid item mr={2} itemId={x._id}>
                      <MatchCard
                        key={i}
                        link={"/user/my-matches/" + x._id}
                        img={
                          x.matchTitleImage
                            ? BASE_URL + x.matchTitleImage
                            : null
                        }
                        name={x.matchName}
                        challengeBy={x?.challengeBy}
                        challengeTo={x?.challengeTo}
                        prize={x.prize}
                        date={x.startDate}
                        time={x.startTime}
                        status={x.status}
                      />
                    </Grid>
                  )
                );
              })
            ) : (
              <GeneralText text="No Matches Found!" />
            )}
            {/* </HorizontalScroll> */}
          </Grid>
        </Box>
      </Box>
      <Box mt={3}>
        <Typography
          component="span"
          sx={{ color: "white", fontSize: 24, fontWeight: "bold", mt: 5 }}
        >
          My Tournaments
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container mt={2} className={classes.tournamentsScroll}>
            {mytournaments.length ? (
              mytournaments.map((x, i) => (
                <Grid item mr={2}>
                  <SmartCard
                    key={i}
                    link={"/user/tournament/" + x._id}
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
              ))
            ) : (
              <GeneralText text="No Tournaments Found!" />
            )}
          </Grid>
        </Box>
      </Box>
      <Box mt={3}>
        <Typography
          component="span"
          sx={{ color: "white", fontSize: 24, fontWeight: "bold", mt: 5 }}
        >
          My Ladders
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container mt={2} className={classes.tournamentsScroll}>
            {myladders.length ? (
              myladders.map((x, i) => (
                <Grid item mr={2}>
                  <SmartCard
                    key={i}
                    link={"/user/ladder/" + x._id}
                    img={
                      x.ladderTitleImage ? BASE_URL + x.ladderTitleImage : null
                    }
                    name={x.ladderName}
                    prizePool={x.prize}
                    teamSize={x.teamSize}
                    entryFee={x.entryFee}
                    date={x.ladderDate}
                    time={x.ladderTime}
                  />
                </Grid>
              ))
            ) : (
              <GeneralText text="No Ladders Found!" />
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
