import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getGames } from "./reducers";
import FilterBar from "../../components/platformTypeBar/platformTypeBar";
import classes from "./index.module.scss";
import NameBar from "../../components/nameBar/nameBar";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: "white",
  position: "relative",
}));
const BASE_URL = process.env.REACT_APP_BASE_URL + "/";
const Types = ["All", "Tournament", "Ladder"];

export default function Games() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");
  const { games } = useSelector((state) => state.userGames);

  useEffect(() => {
    dispatch(getGames({ query: filter }));
  }, [filter]);

  return (
    <>
      <Box className="far-apart-center">
        <Typography component="span" sx={{ color: "white", fontSize: 24 }}>
          Games
        </Typography>
        <Box>
          <FilterBar
            types={Types}
            val={filter}
            valHanlder={(val) => setFilter(val)}
          />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container mt={2} spacing={2}>
          {games &&
            games.map((game, i) => (
              <Grid item key={i} md={12 / 5}>
                <Link to={"/user/game/" + game._id}>
                  <Item
                    style={{
                      backgroundImage: `url(${BASE_URL + game?.gameImage})`,
                    }}
                    className={classes.cardStyle}
                  >
                    <span className={classes.title}>
                      <NameBar
                        title={game.gameName}
                        color="white"
                        bottom="10%"
                      />
                    </span>
                  </Item>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
