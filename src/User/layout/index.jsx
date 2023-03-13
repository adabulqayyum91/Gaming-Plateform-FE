import React, { useEffect } from "react";
import Header from "./header/index";
import SideBar from "./sidebar/index";
import ChatBar from "./chatbar/index";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../pages/Profile/reducers";
import { Grid, Box } from "@mui/material";

const Index = ({ children }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);

  const { profile } = userProfile;
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <Header />
      <Box sx={{ height: "90vh", marginTop: "115px" }}>
        <Grid container style={{ marginTop: "16px", height: "100%" }}>
          <SideBar profile={profile} />
          <Grid
            item
            md={9}
            style={{
              paddingLeft: "2%",
            }}
          >
            {children}
          </Grid>
          <ChatBar />
        </Grid>
      </Box>
    </>
  );
};

export default Index;
