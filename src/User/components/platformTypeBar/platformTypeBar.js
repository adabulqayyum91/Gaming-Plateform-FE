import React from "react";
import { Typography } from "@mui/material";

export default function PlatformTypeBar({ val, valHanlder, types }) {
  return (
    <>
      {types.map((type, i) => {
        return (
          <Typography
            sx={{ px: 2, ml: 1 }}
            component="p"
            key={i}
            style={{
              color: type == val ? "white" : "#f26826",
              background: type == val ? "#f26826" : "",
              border: "1px solid #f26826",
              borderRadius: "15px",
              display: "inline-block",
              cursor: "pointer",
            }}
            onClick={() => valHanlder(type)}
          >
            {type}
          </Typography>
        );
      })}
    </>
  );
}
