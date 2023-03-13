import React, { useState } from "react";
import { TableRow, TableCell, Grid, Typography } from "@mui/material";

import { headCells } from "./tblColumns";
import GeneralText from "../../../../../components/generalText/generalText";
import UseTable from "../../../../../components/UseTable/useTable";
import { tooltipTrim } from "../../../../../../utils/apiutils";
import TeamViewModal from "../../../TeamViewModal";

export default function Leaderboard({ leaderboard, profile }) {
  const [showModal, setShowModal] = useState({ flag: false, teamId: null });
  const { TblContainer } = UseTable(leaderboard, headCells);

  return (
    <>
      <TeamViewModal
        teamId={showModal.teamId}
        showModal={showModal.flag}
        handleClose={() =>
          setShowModal({
            flag: false,
            teamId: null,
          })
        }
      />
      {leaderboard?.length ? (
        <TblContainer>
          {leaderboard.map((row) => {
            return (
              <TableRow hover key={row._id}>
                <TableCell align="left" scope="row" padding="none">
                  {row?.rank}
                </TableCell>
                <TableCell align="center" color="#F26826">
                  <Typography
                    onClick={() =>
                      profile?.leagueJoined
                        ? setShowModal({
                            flag: true,
                            teamId: row._id,
                          })
                        : null
                    }
                    component="span"
                    color={profile?.leagueJoined ? "#F26826" : "white"}
                    fontWeight="bold"
                    sx={{ cursor: "pointer" }}
                  >
                    {tooltipTrim(row?.flTeamName, 20)}
                  </Typography>
                </TableCell>
                <TableCell align="center">{row?.points}</TableCell>
              </TableRow>
            );
          })}
        </TblContainer>
      ) : (
        <Grid container sx={{ width: "100%", height: "100px" }}>
          <GeneralText text="No Leaderboard Found!" />
        </Grid>
      )}
    </>
  );
}
