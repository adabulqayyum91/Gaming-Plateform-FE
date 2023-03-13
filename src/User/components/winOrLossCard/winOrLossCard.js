import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import lossImg from "../../../assets/Group 1540.svg";
import winImg from "../../../assets/Group 1539.svg";
import currentMatchImg from "../../../assets/Group 1514.png";
import { capitalize } from "../../../utils/apisauce";
import "./winOrLossCard.scss";

export default function WinOrLossCard({ link, img, name, status, date }) {
  return (
    <Grid md={12 / 4} rowSpacing={2} rowSpacing={1} width="160px">
      <div className="card winorloss-gamecard ">
        <Link to={link} className="winorloss-gamecard-profile ">
          <img
            alt=" "
            className="winorloss-gamecard-profilePic"
            height="131"
            src={img ? img : currentMatchImg}
            width="280"
          />
          <span className="winorloss-gamecard-profiletext">
            <span style={{ fontWeight: "bold" }}> {name.toUpperCase()}</span>
          </span>
        </Link>
        <div className="winorloss-card-body">
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item color="gray">
              Played Date <br />
              <p style={{ color: "white", fontSize: "14px" }}>{date}</p>
            </Grid>
            <Grid item pt={2} pl={2}>
              <img alt=" " src={status === "win" ? winImg : lossImg} />
              <span
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {capitalize(status)}
              </span>
            </Grid>
          </Grid>
        </div>
      </div>
    </Grid>
  );
}
