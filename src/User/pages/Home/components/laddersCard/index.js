// libraries
import { Grid, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import {useState , useEffect } from "react";
// components
import MiniDetail from "../../../../components/miniDetail/miniDetail"
// assets
import currentMatchImg from "../../../../../assets/Group 1514.png";
import pricePoolImg from "../../../../../assets/Group 16.svg";
import teamSizeImg from "../../../../../assets/Group 168(1).svg";
import moment from "moment";


const LadderCard = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL + '/';
  console.log("This is x comming as props====>>>>", props.ladder);
  useEffect(() => (props ? console.log(props) : "nothing"), [props]);
  return (
    <Box width="280px">
    <div className="card smartcard-gamecard ">
      <Link to={""} className="smartcard-gamecard-profile ">
        <img
          alt=" "
          className="smartcard-gamecard-profilePic"
          height="131"
          src={props && props.ladder && BASE_URL+props.ladder.ladderTitleImage}
          width="280"
        />
        <span className="smartcard-gamecard-profiletext">
          <span>{ moment(props && props.ladder && props.ladder.startingDateAndTime).format('L') }</span>
          <br />
          {/* {time && ( */}
            <span>
              Starting At <span style={{ color: "#F26826" }}>{moment(props && props.ladder && props.ladder.startingDateAndTime).format('LT')} </span>
            </span>
          {/* )} */}
        </span>
      </Link>
      <div className="smartcard-card-body">
        <p className="smartcard-card-bodyhead ">{props && props.ladder && props.ladder.ladderName}</p>
        <Grid container>
          <Grid item md={3}>
            <MiniDetail
              title="Prize Pool"
              logo={pricePoolImg}
              value={props && props.ladder && props.ladder.prize}
            />
          </Grid>
          <Grid item md={3}>
            <MiniDetail
              title="Team Size"
              logo={teamSizeImg}
              value={props && props.ladder && props.ladder.teamSize}
            />
          </Grid>
          <Grid item md={3}>
            <MiniDetail
              title="Entry Fee"
              logo={pricePoolImg}
              value={props && props.ladder && props.ladder.entryFee}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  </Box>
  )
}

export default LadderCard