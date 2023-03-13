import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { tooltipTrim } from "../../../utils/apiutils";

export default function FantasyLeagueCard({ link, img, name }) {
  const MatchHead = () => {
    return (
      <img
        alt=" "
        className=""
        height="82%"
        src={img}
        width="100%"
        style={{
          padding: "15px",
          borderRadius: "8px",
        }}
      />
    );
  };

  return (
    <Link to={link}>
      <Box
        height="220px"
        width="100%"
        sx={{
          borderRadius: "8px",
          backgroundColor: "#232323",
        }}
      >
        <MatchHead />
        <div className="">
          <Typography
            component="span"
            sx={{ color: "white", fontWeight: "bold", marginLeft: "15px" }}
          >
            {tooltipTrim(name, 20)}
          </Typography>
        </div>
      </Box>
    </Link>
  );
}
