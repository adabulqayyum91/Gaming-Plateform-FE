import { makeStyles } from "@material-ui/styles";
import React from "react";

import { styled } from "@mui/system";

const MyPrimaryButton = styled("button")(({ pad }) => {
  return {
    backgroundColor: "#F26826",
    padding: pad ? pad : "10px 70px",
    borderRadius: "4px",
    color: "white",
    fontSize: "16px",
    float: "right",
    marginRight: "4%",
    marginTop: "4%",
  };
});

export default function PrimaryButton({ title, clickHandler, pad }) {
  return (
    <>
      <MyPrimaryButton onClick={clickHandler} pad={pad}>
        {title}
      </MyPrimaryButton>
    </>
  );
}
