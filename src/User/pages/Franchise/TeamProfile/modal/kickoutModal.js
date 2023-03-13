import React from "react";
import DynamicButton from "../../../../components/dynamicButton/dynamicButton";
import Modal from "../../../../components/topModal/topModal";

export default function KickoutModal({ open, handleClose, kickoutHanlder }) {
  return (
    <Modal open={open} handleClose={handleClose}>
      <span>Are you sure you want to kick out?</span>
      <div
        style={{
          padding: "50px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <DynamicButton
          title={"Yes"}
          color={true}
          pl="20px"
          pr="20px"
          pt="7px"
          pb="7px"
          clickHandler={() => kickoutHanlder()}
        />

        <DynamicButton
          title={"Cancel"}
          color={false}
          pl="20px"
          pr="20px"
          pt="7px"
          pb="7px"
          clickHandler={handleClose}
        />
      </div>
    </Modal>
  );
}
