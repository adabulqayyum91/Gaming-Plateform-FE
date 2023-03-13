import React from "react";
import classes from "./miniDetail.module.scss";

export default function MiniDetail({ title, logo, value }) {
  return (
    <>
      <div className={classes.container}>
        <p className={classes.title}>{title}</p>
        <span>
          <img alt=" " height="15" width="15" src={logo} />
          <span className={classes.digitNo}>{value}</span>
        </span>
      </div>
    </>
  );
}
