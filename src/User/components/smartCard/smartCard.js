import { Grid, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import currentMatchImg from "../../../assets/Group 1514.png";
import pricePoolImg from "../../../assets/Group 16.svg";
import teamSizeImg from "../../../assets/Group 168(1).svg";
import "./smartCard.scss";
import MiniDetail from "../miniDetail/miniDetail";
import { allWordsCapitalize, timeFormate } from "../../../utils/apiutils";

export default function SmartCard({
  link,
  img,
  name,
  prizePool,
  teamSize,
  entryFee,
  date,
  time,
}) {
  return (
    <Box width="280px">
      <div className="card smartcard-gamecard ">
        <Link to={link} className="smartcard-gamecard-profile ">
          <img
            alt=" "
            className="smartcard-gamecard-profilePic"
            height="131"
            src={img ? img : currentMatchImg}
            width="280"
          />
          <span className="smartcard-gamecard-profiletext">
            <span>{date}</span>
            <br />
            {time && (
              <span>
                Starting At <span style={{ color: "#F26826" }}>{time} UTC</span>
              </span>
            )}
          </span>
        </Link>
        <div className="smartcard-card-body">
          <p className="smartcard-card-bodyhead ">{allWordsCapitalize(name)}</p>
          <Grid container>
            <Grid item md={12 / 3}>
              <MiniDetail
                title="Prize Pool"
                logo={pricePoolImg}
                value={prizePool}
              />
            </Grid>
            <Grid item md={12 / 3}>
              <MiniDetail
                title="Team Size"
                logo={teamSizeImg}
                value={teamSize}
              />
            </Grid>
            <Grid item md={12 / 3}>
              <MiniDetail
                title="Entry Fee"
                logo={pricePoolImg}
                value={entryFee}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </Box>
  );
}
