import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import currentMatchImg from "../../../assets/Group 1514.png";
import pricePoolImg from "../../../assets/Group 16.svg";
import prizeCup from "../../../assets/prizeCup.svg";
import { allWordsCapitalize, tooltipTrim } from "../../../utils/apiutils";
import DynamicButton from "../dynamicButton/dynamicButton";
import "./matchCard.scss";

const userId = localStorage.getItem("user_id");

export default function MatchCard({
  id,
  link,
  img,
  challengeBy,
  challengeTo,
  prize,
  name,
  date,
  time,
  status,
  clickHandler,
}) {
  const MatchHead = () => {
    return (
      <>
        <img
          alt=" "
          className="matchcard-gamecard-profilePic"
          height="131"
          src={img ? img : currentMatchImg}
          width="280"
        />
        <span className="matchcard-gamecard-profiletext">
          <span>{date}</span>
          <br /> Starting At
          <span style={{ color: "#F26826" }}> {time} GMT</span>
        </span>
      </>
    );
  };
  const MatchFooter = () => {
    return (
      <div className="matchcard-footer">
        <p className="matchcard-footer-line"></p>
        <span style={{ fontSize: "10px", marginBottom: "3%" }}>
          Half of the prize connects will be deducted
        </span>
        <span>
          <DynamicButton
            title="Join Match"
            clickHandler={() =>
              clickHandler({ matchId: id, status: "accepted" })
            }
            pl="20px"
            pr="20px"
            pt="2px"
            pb="2px"
            color={true}
          />
        </span>
      </div>
    );
  };
  return (
    <Box
      width="280px"
      height="230px"
    // sx={{ opacity: status == "accepted" ? "1" : "0.5" }}
    >
      <div className="card matchcard-gamecard ">
        {status === "accepted" ? (
          <Link to={link} className="matchcard-gamecard-profile">
            <MatchHead />
          </Link>
        ) : (
          <Box className="matchcard-gamecard-profile">
            <MatchHead />
          </Box>
        )}
        <div className="matchcard-card-body">
          <p className="matchcard-card-bodyhead ">{tooltipTrim(name, 20)}</p>
          <Grid container>
            <Grid item md={12 / 3} sx={{ textAlign: "center" }}>
              <span>{tooltipTrim(challengeBy?.userName, 8)}</span>
              <br />
              {challengeBy?.resultStatus ? (
                <span
                  className={`${challengeBy?.resultStatus == "win"
                      ? "matchcard-Result-win"
                      : "matchcard-Result-loss"
                    }`}
                >
                  {challengeBy.resultStatus.toUpperCase()}
                </span>
              ) : (
                <Typography color="#767676">--</Typography>
              )}
            </Grid>
            <Grid item md={12 / 3} sx={{ textAlign: "center" }}>
              <img src={prizeCup} />
              <br />
              <img src={pricePoolImg} />
              <span>{prize}</span>
            </Grid>
            <Grid item md={12 / 3} sx={{ textAlign: "center" }}>
              <span>{tooltipTrim(challengeTo?.userName, 8)}</span>
              <br />
              {challengeTo?.resultStatus ? (
                <span
                  className={`${challengeTo?.resultStatus == "win"
                      ? "matchcard-Result-win"
                      : "matchcard-Result-loss"
                    }`}
                >
                  {challengeTo.resultStatus.toUpperCase()}
                </span>
              ) : (
                <Typography color="#767676">--</Typography>
              )}
            </Grid>
          </Grid>
          {challengeTo?.userName == "" && userId !== challengeBy?._id && (
            <MatchFooter />
          )}
        </div>
      </div>
    </Box>
  );
}
