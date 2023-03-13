import React from "react";
import { Grid } from "@mui/material";

import SmartCard from "../../../components/smartCard/smartCard";
import GeneralText from "../../../components/generalText/generalText";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function Tournaments({ data, gameName }) {
  return (
    <>
      {data && data.length ? (
        data.map((x, i) => (
          <Grid
            item
            key={x._id}
            md={12 / 2}
            lg={12 / 3}
            xl={12 / 4}
            display="flex"
            justifyContent="center"
          >
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
    </>
  );
}
