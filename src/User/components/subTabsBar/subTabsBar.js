import { Typography } from "@mui/material";
import React from "react";

// const Types = ["All", "Xbox", "PlayStation", "PC", "Mobile"];

export default function SubTabsBar({ val, valHanlder, types }) {
  return (
    <>
      {types.length &&
        types.map((type, i) => {
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
