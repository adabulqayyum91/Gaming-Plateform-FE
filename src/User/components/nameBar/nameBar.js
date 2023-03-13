import React from "react";
import { Typography } from "@mui/material";

import { tooltipTrim } from "../../../utils/apiutils";
import classes from "./nameBar.module.scss";

export default function NameBar({ title, color, bottom }) {
  return (
    <Typography
      component="p"
      className={classes.title}
      style={{
        color: color,
        bottom: bottom,
      }}
    >
      {tooltipTrim(title, 12)}
    </Typography>
  );
}
