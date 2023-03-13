import React from "react";
// import { Button } from "reactstrap";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";

const SubmitButton = styled(Button)(({ color }) => {
  return {
    backgroundColor: color ? "#4A4A4A" : "#F26826",
    padding: "7px 105px",
    color: "white",
    margin: "30px auto",
    "& :hover": {
      // backgroundColor: color ? "#4A4A4A" : "#F26826",
    },
  };
});

export default function button({ title, color, onClickHandler }) {
  return (
    <SubmitButton type="submit" color={color} onClick={onClickHandler}>
      {title}
    </SubmitButton>
  );
}
