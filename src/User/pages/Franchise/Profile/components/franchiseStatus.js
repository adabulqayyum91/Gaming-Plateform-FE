import React from "react";
import { Box, Typography } from "@mui/material";
import DynamicButton from "../../../../components/dynamicButton/dynamicButton";

export const FranchiseStatus = ({ text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography component="span" sx={{ color: "#484848", fontSize: 24 }}>
        {text}
      </Typography>
    </Box>
  );
};
export const AddFranchiseButton = ({ setAddFranchise }) => {
  return (
    <Box
      sx={{
        textAlign: "end",
      }}
    >
      <DynamicButton
        title="Create Grand Prix"
        clickHandler={() => setAddFranchise(true)}
        pl="20px"
        pr="20px"
        pt="5px"
        pb="5px"
        color={true}
      />
    </Box>
  );
};
