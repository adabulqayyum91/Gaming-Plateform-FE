import React from "react";
import { Button } from "reactstrap";
import { styled } from "@mui/system";

const AdminPrimaryButton = styled(Button)({
  backgroundColor: "#F26826",
  padding: "7px 95px",
  margin: "80px auto",
  "& :hover": {
    backgroundColor: "#F26826",
  },
});

export default function Button({ title, clickHandler }) {
  const classes = useStyles();
  return (
    <AdminPrimaryButton
      type="submit"
      className={classes.root}
      onClick={() => clickHandler()}
    >
      {title}
    </AdminPrimaryButton>
  );
}
