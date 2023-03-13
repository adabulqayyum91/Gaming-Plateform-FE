import React from "react";
import { Box, Typography } from "@mui/material";

const GeneralText = ({ text, height }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height ? height : "100%",
        width: "100%",
      }}
    >
      <Typography component="span" sx={{ color: "#484848", fontSize: 24 }}>
        {text}
      </Typography>
    </Box>
  );
};

export default GeneralText;
