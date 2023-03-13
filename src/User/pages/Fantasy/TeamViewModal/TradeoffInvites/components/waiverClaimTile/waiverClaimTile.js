import React from "react";
import { Box, Grid, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { tooltipTrim } from "../../../../../../../utils/apiutils";
import classes from "./waiverClaimTile.module.scss";

export default function WaiverClaimTile({
  requestDetail,
  waiverClaimModalOpenHandler,
}) {
  return (
    <>
      <Box className={classes.receivedTeamRoot}>
        <Grid container>
          <Grid item md={10}>
            <Box className={classes.receivedteamTileTitle}>
              {tooltipTrim(requestDetail, 35)}
            </Box>
          </Grid>
          <Grid item md={2}>
            <IconButton onClick={waiverClaimModalOpenHandler}>
              <VisibilityIcon style={{ color: "#A4A4A4" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
