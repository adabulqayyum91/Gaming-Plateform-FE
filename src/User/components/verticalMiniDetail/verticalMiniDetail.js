import React from "react";
import classes from "./verticalMiniDetail.module.scss";

export default function VerticalMiniDetail({ title, logo, value, size }) {
  return (
    <>
      <div className={classes.container}>
        <img alt=" " height={size} width={size} src={logo} />
        <p className={classes.title}>{title}</p>
        <p className={classes.digitNo}>{value}</p>
      </div>
    </>
  );
}
