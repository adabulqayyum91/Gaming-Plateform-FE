import { Box, Typography } from "@mui/material";
import React from "react";

import dummyTile from "../../../assets/dummyTile.png";
import classes from "./dummyCard.module.scss";

export default function DummyCard({ text }) {
  return (
    // <Box width="280px" height="230px" p={3}  borderRadius="2%">
    <Box height="100%" width="100%" className={classes.myCard}>
      <Box className={classes.innerBox}>
        <img src={dummyTile} alt=" " className={classes.cardImg}></img>
        <Typography variant="h6" className={classes.myCardText}>
          {text}
        </Typography>
      </Box>
    </Box>
    // </Box>
  );
}
