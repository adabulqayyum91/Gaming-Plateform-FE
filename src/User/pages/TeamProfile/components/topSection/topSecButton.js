import React from "react";
import classes from "./topSection.module.scss";

export default function TopSectionButton({
  title,
  icon,
  clickHandler,
  disabled,
}) {
  return (
    <>
      <button
        className={classes.myButton}
        onClick={clickHandler}
        disabled={disabled}
        style={{ cursor: "pointer" }}
      >
        {icon && <img alt=" " src={icon} className={classes.icons} />}
        {title}
      </button>
    </>
  );
}
