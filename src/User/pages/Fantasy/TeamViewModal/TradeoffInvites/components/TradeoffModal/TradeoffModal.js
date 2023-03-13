import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";

import tradeoffIcon from "../../../../../../../assets/tradeoff modal icon smal.png";
import Modal from "../../../../../../components/topModal/topModal";
import FormSubmitButton from "../../../../../../../Admin/components/FormSubmitButton/formSubmitbutton";
import FlTeamPlayerCard from "../../../../../../components/FlTeamPlayerCard/FlTeamPlayerCard";
import CustomSelectInput from "../../../../../../components/PlayerSelectionCard/customSelectInput";
import playerbgIcon from "../../../../../../../assets/playerbgIcon.png";
import classes from "./TradeoffModal.module.scss";

export default function TradeoffModal({
  open,
  handleClose,
  tradeMoveData,
  sendTradeHandler,
}) {
  const playerTwoData = tradeMoveData?.playerData[1];
  const [selectedPlayer, setSelectedPlayer] = useState(playerTwoData);

  const playersList = tradeMoveData?.playerList;
  const playerOne = tradeMoveData?.playerData[0];

  const handleChange = ({ target }) => {
    let _player = playersList.filter((x) => x.userName === target.value)[0];
    setSelectedPlayer(_player);
  };

  const EmptyCard = () => (
    <Box className={classes.topContainer}>
      <Box className={classes.circularImageRoot}>
        <img
          alt=" "
          src={playerbgIcon}
          height="165px"
          width="165px"
          className={classes.circularImgPreview}
        />
      </Box>
      <Box pr={4} textAlign="center">
        {playersList?.length ? (
          <CustomSelectInput
            type="text"
            name="playerId"
            required={true}
            placeholder="Select Player"
            onchange={handleChange}
            value={selectedPlayer?.userName ? selectedPlayer?.userName : ""}
            items={playersList}
            keyname1="userName"
            keyname2="userPoints"
          />
        ) : (
          <Typography variant="h6" pt={5} pl={4}>
            No Players Available
          </Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Modal open={open} handleClose={handleClose} widthe={750}>
      <Grid container justifyContent="space-between" alignItems="center" my={5}>
        <FlTeamPlayerCard
          key={playerOne?.playerId}
          win={playerOne?.win}
          points={playerOne?.points}
          name={playerOne?.userName}
          img={playerOne?.profileImage}
          winPercentage={playerOne?.winPercentage}
        />
        <img src={tradeoffIcon} alt=" " />
        {selectedPlayer?.playerId ? (
          <FlTeamPlayerCard
            key={selectedPlayer?.playerId}
            win={selectedPlayer?.win}
            points={selectedPlayer?.points}
            name={selectedPlayer?.userName}
            img={selectedPlayer?.profileImage}
            winPercentage={selectedPlayer?.winPercentage}
          />
        ) : (
          <EmptyCard />
        )}
      </Grid>
      <Grid container justifyContent="center" alignItems="center" my={5}>
        <FormSubmitButton
          title="Send Trade Proposal"
          onClickHandler={() =>
            sendTradeHandler(playerOne?.playerId, selectedPlayer?.playerId)
          }
        />
      </Grid>
    </Modal>
  );
}
