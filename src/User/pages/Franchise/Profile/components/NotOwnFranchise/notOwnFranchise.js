import React, { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import classes from "./notOwnFranchise.module.scss";
import Marketplace from "./MarketPlace/marketPlace";
import { getFranchises } from "../../reducers";
import { getFranchiseLeagues } from "../../../Leagues/reducers";
import Leagues from "../../../Leagues/leagues";

export default function NotOwnFranchise({
  franchise,
  isBlock,
  approvedStatus,
  setAddFranchise,
}) {
  const dispatch = useDispatch();
  const [type, setType] = useState("All");

  const { franchises } = useSelector((state) => state.userFranchiseProfile);
  const { leagues } = useSelector((state) => state.userFranchiseLeagues);

  useEffect(() => {
    let typeCpy = type;
    typeCpy = typeCpy?.split(" ");
    typeCpy = typeCpy[typeCpy?.length - 1]?.toLowerCase();
    dispatch(getFranchises({ franchiseStatus: typeCpy }));
    dispatch(getFranchiseLeagues());

  }, [type]);

  return (
    <>
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="span" className={classes.title}>
          Marketplace
        </Typography>
        <Box>
          {approvedStatus !== "pending" &&
            approvedStatus !== "disapproved" &&
            isBlock !== true && (
              <>
                <Typography component="span" className={classes.dontOwn}>
                  You don't own any grand prix: &nbsp;
                </Typography>
                <Typography
                  component="span"
                  className={classes.createFranchise}
                  onClick={() => setAddFranchise(true)}
                >
                  Create Grand Prix?
                </Typography>
              </>
            )}
        </Box>
      </Grid>
      <Marketplace
        data={franchises}
        type={type}
        setType={setType}
        franchiseId={franchise._id}
      />
      <div className="mt-3 mb-2">

      </div>
      <Leagues
        franchiseId={franchise._id}
      />

    </>
  );
}
