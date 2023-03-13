import React from "react";
import jwt_decode from "jwt-decode";

const AuthVerify = () => {
  const logout = () => {
    if (localStorage.getItem("userToken")) {
      localStorage.setItem("navText", "Profile");
      localStorage.removeItem("userToken");
    }
    localStorage.getItem("adminToken") && localStorage.removeItem("adminToken");
    window.location.replace("/auth/login");
  };

  const user = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : localStorage.getItem("adminToken");

  if (user) {
    let decodedJwt = jwt_decode(user);
    if (decodedJwt.exp * 1000 < Date.now()) {
      logout();
    }
  }

  return <div></div>;
};

export default AuthVerify;
