import React from "react";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router";

const BackChevron = ({ position }) => {
  const navigate = useNavigate();
  return <></>;
  return (
    <IconButton
      onClick={() => navigate(-1)}
      className={{
        top: "2%",
        left: "2%",
        // position: position,
        background: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <ChevronLeftIcon sx={{ color: "#F26826", pb: "3px" }} />
    </IconButton>
  );
};
export default BackChevron;
