import React from "react";
import { Link } from "react-router-dom";

export default function notFound() {
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        bottom: "0px",
        left: "0px",
        right: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1A1A1A",
      }}
    >
      <h1>Not Found</h1>
      <Link to="/user/profile">Go Back</Link>
    </div>
  );
}
