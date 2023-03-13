import React from "react";
import { styled } from "@mui/system";

const MyDynamicButton = styled("button")(({ props }) => ({
  backgroundColor: props.color ? "#F26826" : "#1A1A1A",
  paddingLeft: props.pl,
  paddingRight: props.pr,
  paddingTop: props.pt,
  paddingBottom: props.pb,
  border: "1px solid #707070",
  borderRadius: "4px",
  color: "white",
  fontSize: "16px",
}));

export default function DynamicButton({ title, clickHandler, ...props }) {
  return (
    <>
      <MyDynamicButton props={props} onClick={clickHandler}>
        {title}
      </MyDynamicButton>
    </>
  );
}
