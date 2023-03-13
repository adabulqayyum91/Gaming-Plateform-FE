import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import React from "react";

import winImg from "../../../../../../assets/Mask Group 270.svg";
import lossImg from "../../../../../../assets/Mask Group 271.svg";
import MiniDetail from "../../../../../components/miniDetail/miniDetail";
import removeTeamImg from "../../../../../../assets/Group 1534.svg";
import { tooltipTrim } from "../../../../../../utils/apiutils";
import classes from "./bottomSection.module.scss";

export default function RosterTeamTile({
  id,
  title,
  img,
  loss,
  win,
  mcd,
  mprz,
  prz,
  setPerctObj,
  kickoutHanlder,
  shouldKickOut,
}) {
  return (
    <>
      <Box className={classes.teamRoot}>
        <Grid container>
          <Grid item md={3} pt={1}>
            <img alt=" " src={img} className={classes.teamsIcon} />
          </Grid>
          <Grid item md={8} pl={0.5}>
            <Typography className={classes.teamTileTitle}>
              {tooltipTrim(title, 11)}
            </Typography>
            <Box>
              <Grid container className={classes.teamIconsImgs}>
                <MiniDetail title="Wins" logo={winImg} value={win} />
                <MiniDetail title="Loss" logo={lossImg} value={loss} />
              </Grid>
            </Box>
          </Grid>
          <Grid item md={1}>
            {shouldKickOut && (
              <img
                style={{ cursor: "pointer" }}
                alt=""
                src={removeTeamImg}
                onClick={() => kickoutHanlder(id)}
              />
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={12 / 3} textAlign="center">
            <Typography component="p" color="#767676" fontSize="15px">
              PRZ%
            </Typography>
            <Typography component="p" color="white" fontSize="12px">
              <Typography component="span" color="white" fontSize="12px">
                {prz}{" "}
                {shouldKickOut && (
                  <IconButton
                    onClick={() =>
                      setPerctObj({
                        id: id,
                        open: true,
                        title: "prz",
                        percentage: prz,
                      })
                    }
                  >
                    <EditIcon
                      style={{
                        color: "#F26826",
                        fontSize: "14px",
                        padding: "0px",
                      }}
                    />
                  </IconButton>
                )}
              </Typography>
            </Typography>
          </Grid>
          <Grid item md={12 / 3} textAlign="center">
            <Typography component="p" color="#767676" fontSize="15px">
              MCD%
            </Typography>
            <Typography component="p" color="white" fontSize="12px">
              <Typography component="span" color="white" fontSize="12px">
                {mcd}{" "}
                {shouldKickOut && (
                  <IconButton
                    onClick={() =>
                      setPerctObj({
                        id: id,
                        open: true,
                        title: "mcd",
                        percentage: mcd,
                      })
                    }
                  >
                    <EditIcon
                      style={{
                        color: "#F26826",
                        fontSize: "14px",
                        padding: "0px",
                      }}
                    />
                  </IconButton>
                )}
              </Typography>
            </Typography>
          </Grid>
          <Grid item md={12 / 3} textAlign="center">
            <Typography component="p" color="#767676" fontSize="15px">
              MPRZ%
            </Typography>
            <Typography component="p" color="white" fontSize="12px">
              <Typography component="span" color="white" fontSize="12px">
                {mprz}{" "}
                {shouldKickOut && (
                  <IconButton
                    onClick={() =>
                      setPerctObj({
                        id: id,
                        open: true,
                        title: "mprz",
                        percentage: mprz,
                      })
                    }
                  >
                    <EditIcon
                      style={{
                        color: "#F26826",
                        fontSize: "14px",
                        padding: "0px",
                      }}
                    />
                  </IconButton>
                )}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
