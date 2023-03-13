import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import tradeoffIcon from "../../../assets/tradeoff modal icon smal.png";
import playerbgIcon from "../../../assets/Ellipse 5@2x.png";
import { tooltipTrim } from "../../../utils/apiutils";
import classes from "./FlTeamPlayerCard.module.scss";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function FlTeamPlayerCard({
  id,
  img,
  name,
  points,
  win,
  isOwner,
  tradeStatus,
  winPercentage,
  showTradeModalHandler,
  playerCardActionHandler,
}) {
  const [waiversOption, setWaiversOption] = useState(false);

  const waiverDropdownHandler = (val) => {
    setWaiversOption(false);
    playerCardActionHandler(id, val);
  };

  return (
    <>
      <Box className={classes.topContainer}>
        {isOwner == "owner" && (
          <Box sx={{ position: "relative" }}>
            <Typography
              component="div"
              sx={{ textAlign: "right", padding: "0" }}
            >
              <IconButton
                onClick={() => setWaiversOption((val) => !val)}
                sx={{ padding: "0px" }}
              >
                {!tradeStatus && <MoreHorizIcon sx={{ color: "#656565" }} />}
              </IconButton>
              {waiversOption && (
                <Typography className={classes.waiverDropdown} component="div">
                  <Typography
                    component="p"
                    className={classes.waiverDropOption}
                    onClick={() => waiverDropdownHandler("waiverClaim")}
                  >
                    Waiver claim
                  </Typography>
                  <Typography
                    component="p"
                    className={classes.waiverDropOption}
                    onClick={() => waiverDropdownHandler("dropPlayer")}
                  >
                    Drop player
                  </Typography>
                </Typography>
              )}
            </Typography>
          </Box>
        )}
        {isOwner == "notOwner" && (
          <Box sx={{ position: "relative" }}>
            <Typography
              component="div"
              sx={{ textAlign: "right", padding: "0" }}
            >
              <IconButton
                onClick={() => showTradeModalHandler(id)}
                sx={{ padding: "0px" }}
              >
                {!tradeStatus && (
                  <img src={tradeoffIcon} alt=" " height="30" width="30" />
                )}
              </IconButton>
            </Typography>
          </Box>
        )}
        <Box className={classes.circularImageRoot}>
          <img
            alt=" "
            src={img ? BASE_URL + img : playerbgIcon}
            height="165px"
            width="165px"
            className={classes.circularImgPreview}
          />
        </Box>
        <Box>
          <Box
            borderBottom="1px solid #707070"
            className={classes.linesContainer}
          >
            <Typography
              component="span"
              sx={{ color: "whitesmoke", fontWeight: "bold", fontSize: "20px" }}
            >
              {tooltipTrim(name, 13)}
            </Typography>
            <Typography
              component="span"
              sx={{ color: "#F26826", fontWeight: "bold", fontSize: "20px" }}
            >
              {points} PTS
            </Typography>
          </Box>
          <Box className={classes.linesContainer}>
            <Typography component="span" sx={{ color: "#959595" }}>
              Win
            </Typography>
            <Typography component="span" sx={{ color: "#F26826" }}>
              {win}
            </Typography>
          </Box>
          <Box className={classes.linesContainer}>
            <Typography component="span" sx={{ color: "#959595" }}>
              Win%
            </Typography>
            <Typography component="span" sx={{ color: "#F26826" }}>
              {winPercentage}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
