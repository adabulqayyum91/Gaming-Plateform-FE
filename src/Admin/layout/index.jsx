import React from "react";
import Header from "./header/index";

const Index = ({ children }) => {
  const header = [
    "Users",
    "Results",
    "Games",
    "Tournaments",
    "Ladders",
    "Credits",
  ];
  return (
    <>
      <Header header={header} />
      <div style={{ height: "100%", marginTop: "120px" }}>{children}</div>
    </>
  );
};

export default Index;
