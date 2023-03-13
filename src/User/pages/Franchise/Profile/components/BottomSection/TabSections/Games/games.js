import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import GeneralText from "../../../../../../../components/generalText/generalText";
import classes from "./games.module.scss";
import NameBar from "../../../../../../../components/nameBar/nameBar";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: "white",
  position: "relative",
}));

export default function Games({ data, franchiseId }) {
  return (
    <>
      <Grid className="far-apart-center" width="100%">
        <Typography component="span" sx={{ color: "white", fontSize: 24 }}>
          Games
        </Typography>
      </Grid>
      {data && data.length ? (
        <Grid item md={12} className={classes.marketBox}>
          <Grid container my={1}>
            <Grid item md={12} className={classes.teamsRosterBar}>
              <Grid container spacing={2} justifyContent="left">
                {data.map(
                  (x, i) =>
                    x._id !== franchiseId && (
                      <Grid
                        item
                        key={i}
                        md={12 / 3}
                        lg={12 / 4}
                        xl={12 / 4}
                        display="flex"
                        justifyContent="center"
                      >
                        <Item
                          style={{
                            backgroundImage: `url(${BASE_URL + x?.gameImage})`,
                          }}
                          className={classes.cardStyle}
                        >
                          <span className={classes.title}>
                            <NameBar
                              title={x.gameName}
                              color="white"
                              bottom="10%"
                            />
                          </span>
                        </Item>
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
          <GeneralText text="No Games Found!" />
        </Grid>
      )}
    </>
  );
}
