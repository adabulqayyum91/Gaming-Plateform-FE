import React from "react";
import { Grid } from "@mui/material";

import MatchCard from "../../../components/matchCard/matchCard";
import GeneralText from "../../../components/generalText/generalText";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function Matches({ data, gameName, clickHandler }) {
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
            <MatchCard
              key={i}
              id={x._id}
              link={"/user/my-matches/" + x._id}
              img={x.matchTitleImage ? BASE_URL + x.matchTitleImage : null}
              name={x.matchName}
              challengeBy={x?.challengeBy}
              challengeTo={x?.challengeTo}
              prize={x.prize}
              date={x.startDate}
              time={x.startTime}
              status={x.status}
              clickHandler={clickHandler}
            />
          </Grid>
        ))
      ) : (
        <GeneralText text="No Matches Found!" />
      )}
    </>
  );
}
