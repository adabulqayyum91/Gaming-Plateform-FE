import React from "react";
import { Grid, Typography } from "@mui/material";

import SmartCard from "../../../../components/smartCard/smartCard";
import GeneralText from "../../../../components/generalText/generalText";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function CurrentTournaments({ tournaments }) {
  return (
    <Grid container my={2}>
      <Grid
        item
        md={12}
        sx={{
          padding: "30px",
          border: "1px solid #707070",
          borderRadius: "8px",
        }}
      >
        <Grid container spacing={2}>
          {tournaments.length ? (
            tournaments.map((x, i) => (
              <Grid item key={i} md={12 / 2} lg={12 / 3} xl={12 / 4}>
                <SmartCard
                  key={i}
                  link={"/user/tournament/" + x._id}
                  img={
                    x.tournamentTitleImage
                      ? BASE_URL + x.tournamentTitleImage
                      : ""
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
      </Grid>
    </Grid>
  );
}
