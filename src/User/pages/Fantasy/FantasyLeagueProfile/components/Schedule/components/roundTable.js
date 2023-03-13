import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Typography,
  TableRow,
  TableCell,
  Box,
  Grid,
  IconButton,
} from "@mui/material";

import { headCells } from "./tblColumns";
import classes from "../schedule.module.scss";
import versusIcon from "../../../../../../../assets/versus.png";
import UseRoundTable from "../../../../../../components/UseRoundTable/useTable";
import { capitalize } from "../../../../../../../utils/apisauce";
import ScheduleModal from "./scheduleModal";

export default function RoundTable({ matches, roundNo, leagueScheduleData }) {
  const { TblContainer } = UseRoundTable(matches, headCells);
  const [showmore, setShowmore] = useState(false);

  const rounds = leagueScheduleData.filter((x) => {
    return x.scheduleType === "round" && x;
  });
  const playoffs = leagueScheduleData.filter((x) => {
    return x.scheduleType === "playoff" && x;
  });
  const finals = leagueScheduleData.filter((x) => {
    return x.scheduleType === "final" && x;
  });
  const showMoreSchedule = () => {
    setShowmore(true);
  };
  const handleClose = (val) => {
    setShowmore(false);
  };

  return (
    <>
      <ScheduleModal
        showmore={showmore}
        handleClose={handleClose}
        leagueScheduleData={leagueScheduleData}
        rounds={rounds}
        playoffs={playoffs}
        finals={finals}
      />
      <Box mt={2} className={classes.roundTable}>
        <Typography variant="h5" color="white" textAlign="left">
          Season Schedule{" "}
          <Typography
            variant="p"
            color="#f26826"
            onClick={showMoreSchedule}
            sx={{ cursor: "pointer" }}
          >
            Show more
            <IconButton>
              <VisibilityIcon style={{ color: "#A4A4A4" }} />
            </IconButton>
          </Typography>
        </Typography>

        <TblContainer>
          {matches.length ? (
            matches.map((row, i) => {
              let noCellBorder = i !== matches.length - 1;
              return (
                <TableRow hover key={row._id}>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="left"
                    scope="row"
                  >
                    {row?.srNo}
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                  >
                    <Grid container>
                      <Grid item md={5.5} textAlign="right">
                        {capitalize(row?.teamOne)}
                      </Grid>
                      <Grid item md={1}>
                        <img
                          src={versusIcon}
                          alt="versus"
                          className={classes.vsIcon}
                        />
                      </Grid>
                      <Grid item md={5.5} textAlign="left">
                        {capitalize(row?.teamTwo)}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell
                    className={noCellBorder ? null : classes.noBorder}
                    align="center"
                    style={{ color: "#F26826" }}
                  >
                    {capitalize(row?.winner)}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <Grid
              container
              marginY={4}
              justifyContent="end"
              alignItems="center"
              sx={{ fontSize: "20px", color: "#484848" }}
            >
              <span>No Rounds Found! </span>
            </Grid>
          )}
        </TblContainer>
      </Box>
    </>
  );
}
