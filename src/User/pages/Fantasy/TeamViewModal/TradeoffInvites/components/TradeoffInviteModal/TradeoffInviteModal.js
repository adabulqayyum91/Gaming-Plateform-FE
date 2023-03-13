import React from "react";
import { Grid, Typography } from "@mui/material";

import tradeoffIcon from "../../../../../../../assets/tradeoff modal icon smal.png";
import Modal from "../../../../../../components/topModal/topModal";
import FormSubmitButton from "../../../../../../../Admin/components/FormSubmitButton/formSubmitbutton";
import FlTeamPlayerCard from "../../../../../../components/FlTeamPlayerCard/FlTeamPlayerCard";
import { capitalize } from "../../../../../../../utils/apisauce";

export default function TradeoffInviteModal({
  open,
  handleClose,
  requestHandler,
  tradeMoveRequestDetail,
}) {
  const playerOne = tradeMoveRequestDetail?.givePlayerData;
  const playerTwo = tradeMoveRequestDetail?.takePlayerData;
  const _approvedStatus = tradeMoveRequestDetail?.approvedStatus;

  const _requestHandler = (value) => {
    requestHandler({
      approvedStatus: value,
      recordId: tradeMoveRequestDetail?._id,
      givePlayerId: playerTwo?.playerId,
      takePlayerId: playerOne?.playerId,
      giveFlTeamId: tradeMoveRequestDetail?.giveFlTeamId,
      takeFlTeamId: tradeMoveRequestDetail?.takeFlTeamId,
    });
  };

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
        <FlTeamPlayerCard
          key={playerTwo?.playerId}
          win={playerTwo?.win}
          points={playerTwo?.points}
          name={playerTwo?.userName}
          img={playerTwo?.profileImage}
          winPercentage={playerTwo?.winPercentage}
        />
      </Grid>
      <Grid container justifyContent="center" alignItems="center" my={5}>
        {_approvedStatus === "pending" &&
        tradeMoveRequestDetail?.giveFlTeamId !==
          tradeMoveRequestDetail?.teamId ? (
          <>
            <FormSubmitButton
              title="Reject"
              onClickHandler={() => _requestHandler("rejected")}
            />
            <FormSubmitButton
              title="Accept"
              onClickHandler={() => _requestHandler("accepted")}
            />
          </>
        ) : (
          <Typography
            component="p"
            sx={{
              color: _approvedStatus == "accepted" ? "#77F226" : "#D50C0C",
              textAlign: "center",
              fontSize: "22px",
            }}
          >
            {capitalize(_approvedStatus)}!
          </Typography>
        )}
      </Grid>
    </Modal>
  );
}
