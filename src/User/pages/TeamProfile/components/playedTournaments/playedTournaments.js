import React from "react";
import { Grid, Typography } from "@mui/material";

import WinOrLossCard from "../../../../components/winOrLossCard/winOrLossCard";
import GeneralText from "../../../../components/generalText/generalText";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function PlayedTournaments({ tournaments }) {
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
                <WinOrLossCard
                  key={i}
                  link={"/user/tournament/" + x._id}
                  img={
                    x.tournamentTitleImage
                      ? BASE_URL + x.tournamentTitleImage
                      : ""
                  }
                  name={x.tournamentName}
                  status={x?.status}
                  date={x.tournamentDate}
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
