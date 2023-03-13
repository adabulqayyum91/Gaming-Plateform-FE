import React from "react";
import { Grid } from "@mui/material";

import Modal from "../../../../../../components/topModal/topModal";
import FormSubmitButton from "../../../../../../../Admin/components/FormSubmitButton/formSubmitbutton";
import FlTeamPlayerCard from "../../../../../../components/FlTeamPlayerCard/FlTeamPlayerCard";

export default function WaiverClaimModal({
  open,
  dataObj,
  handleClose,
  requestHandler,
}) {
  return (
    <Modal open={open} handleClose={handleClose} widthe={450}>
      <Grid
        container
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Grid my={5} item>
          {dataObj?.playerId && (
            <FlTeamPlayerCard
              win={dataObj?.win}
              key={dataObj?.playerId}
              points={dataObj?.points}
              name={dataObj?.userName}
              img={dataObj?.profileImage}
              winPercentage={dataObj?.winPercentage}
            />
          )}
        </Grid>
        <Grid my={1} item>
          <FormSubmitButton
            title="Remove from waiver"
            onClickHandler={() => {
              return requestHandler(dataObj?.playerId);
            }}
          />
        </Grid>
      </Grid>
    </Modal>
  );
}
