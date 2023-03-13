import React from "react";
import { Grid, Typography, Box } from "@mui/material";

import PlatformTypeBar from "../../../../../../../components/platformTypeBar/platformTypeBar";
import FranchiseCard from "../../../../../../../components/franchiseCard/franchiseCard";
import GeneralText from "../../../../../../../components/generalText/generalText";
import classes from "./marketplace.module.scss";

const Types = ["All", "For Sale", "For Lease"];
const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function Marketplace({ data, type, setType, franchiseId }) {
  const _data = data.filter((x) => x._id !== franchiseId);
  return (
    <>
      <Grid className="far-apart-center" width="100%">
        <Typography component="span" sx={{ color: "white", fontSize: 24 }}>
          Marketplace
        </Typography>
        <Box>
          <PlatformTypeBar
            types={Types}
            val={type}
            valHanlder={(val) => setType(val)}
          />
        </Box>
      </Grid>
      {_data && _data.length ? (
        <Grid item md={12} className={classes.marketBox}>
          <Grid container my={1}>
            <Grid item md={12} className={classes.teamsRosterBar}>
              <Grid container spacing={2} justifyContent="left">
                {_data.map(
                  (x, i) =>
                    x._id !== franchiseId && (
                      <Grid
                        item
                        key={i}
                        md={12 / 2}
                        lg={12 / 3}
                        xl={12 / 4}
                        display="flex"
                        justifyContent="center"
                      >
                        <FranchiseCard
                          key={i}
                          link={`/user/grand-prix/${x._id}`}
                          img={
                            x.franchiseTitleImage
                              ? BASE_URL + x.franchiseTitleImage
                              : null
                          }
                          franchiseName={x.franchiseName}
                          franchiseStatus={x.franchiseStatus}
                          teams={x.totalTeams}
                          owner={x.owner}
                        />
                      </Grid>
                    )
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          height="10px"
          justifyContent="center"
          alignItems="center"
          className={classes.marketBox}
        >
          <GeneralText text="No Grand Prix Found!" />
        </Grid>
      )}
    </>
  );
}
