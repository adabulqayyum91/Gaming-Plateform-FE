import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import profileSelfImg from "../../../assets/teamprofile.png";
import playerbgIcon from "../../../assets/playerbgIcon.png";
import CustomSelectInput from "./customSelectInput";
import classes from "./playerSelectionCard.module.scss";
import { tooltipTrim } from "../../../utils/apiutils";

function CustomName({ name, pts }) {
  return (
    <Box className={classes.palyerName}>
      {name ? (
        <>
          <Typography component="p" color="white" textAlign="left">
            {tooltipTrim(name, 15)}
          </Typography>
          <Typography component="p" color="white" textAlign="right">
            {pts}
          </Typography>
        </>
      ) : (
        <Typography
          component="p"
          color="white"
          textAlign="center"
          padding="0px 53px"
        >
          No selection here!
        </Typography>
      )}
    </Box>
  );
}

export default function PlayerSelectionCard({
  dataObj,
  isJoined,
  playersList,
  lockPlayerHanlder,
}) {
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [modifiedPlayers, setModifiedPlayers] = useState([]);

  useEffect(() => {
    setSelectedPlayer(dataObj);
  }, [dataObj]);

  //to initialize mofified player only once, at initial render
  useEffect(() => {
    let _plist = playersList?.length ? [...playersList] : [];
    setModifiedPlayers(_plist);
  }, [playersList]);

  const handleChange = ({ target }) => {
    const _selectedPlayer = playersList?.filter(
      (x) => x.userName === target.value
    );
    setSelectedPlayer(_selectedPlayer[0]);
    if (selectedPlayer?._id) {
      lockPlayerHanlder(_selectedPlayer[0]?._id, selectedPlayer?._id);
    } else {
      lockPlayerHanlder(_selectedPlayer[0]?._id, null);
    }
  };

  return (
    <Box className={classes.topContainer}>
      <Box className={classes.circularImageRoot}>
        <img
          alt=" "
          src={
            selectedPlayer?.profileImage === undefined
              ? playerbgIcon
              : selectedPlayer?.profileImage === ""
              ? profileSelfImg
              : playerbgIcon
          }
          height="165px"
          width="165px"
          className={classes.circularImgPreview}
        />
      </Box>
      <Box>
        {isJoined ? (
          <CustomSelectInput
            placeholder="Select Player"
            name="playerId"
            type="text"
            required={true}
            onchange={handleChange}
            pts={selectedPlayer?.userPoints}
            value={selectedPlayer?.userName ? selectedPlayer.userName : ""}
            items={modifiedPlayers}
            keyname1="userName"
            keyname2="userPoints"
          />
        ) : (
          <CustomName
            name={selectedPlayer?.userName}
            pts={selectedPlayer?.userPoints}
            classes={classes}
          />
        )}
      </Box>
    </Box>
  );
}
