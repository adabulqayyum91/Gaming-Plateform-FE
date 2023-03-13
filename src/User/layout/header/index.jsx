import React, { useState, useEffect } from "react";
import { Tooltip, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { ButtonBase, Button } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

import MaskGp280 from "../../../assets/Mask Group 280.svg";
import signout from "../../../assets/Sign out.svg";
import profileIconImg from "../../../assets/teamprofile.png";

import { getUsers, setNavText, logout } from "./reducers";
import { lowerDashJoinStr, tooltipTrim } from "../../../utils/apiutils";
import { getFriends } from "../../pages/TeamProfile/reducers";
import DeleteModal from "../../../Admin/components/DeleteModal/deletemodal";
import "./index.css";

import { fontSize } from "@mui/system";
import { useTour } from "@reactour/tour";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

const Index = () => {
  const Header = ["Home", "Games", "Grand Prix", "Rules"];
  const [searchVal, setSearchVal] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { users, headerText } = useSelector((state) => state.userHeader);
  const { friends } = useSelector((state) => state.userTeamProfile);
  const { receivedRequests, sentRequests } = useSelector(
    (state) => state.userInvites
  );

  useEffect(() => {
    if (params["*"]) {
      const path = localStorage.getItem("navText");
      dispatch(setNavText(path));
    }
    const userToken = localStorage.getItem("userToken");
    console.log({ header: userToken });
    if (userToken) {
      dispatch(getFriends());
    } else {
      if (urlParam.includes("home")) {
      } else {
        navigate("/auth/login");
      }
    }
  }, []);
  const checkSession = () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      if (urlParam.includes("home")) {
      } else {
        navigate("/auth/login");
      }
    }
  };
  const friendIds = friends?.map((friend) => friend?._id);

  const userLogoutHandler = () => {
    dispatch(logout());
    const setter = setTimeout(() => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("user_id");
      localStorage.setItem("navText", "Profile");
      window.location.replace("/auth/login");
    }, 300);
    setter();
  };
  const refreshHandler = () => {
    navigate("/home");
  };
  const searchHandler = (val) => {
    setSearchVal(val);
    dispatch(getUsers({ query: val }));
  };
  const userClickHandler = (id) => {
    setSearchVal("");
    navigate("/user/search-user-profile/" + id);
  };
  const headerTextHandler = (val) => {
    localStorage.setItem("navText", val);
    dispatch(setNavText(val));
  };
  const searchClearHandler = () => {
    setSearchVal("");
  };
  const notifClickHandler = (e) => {
    dispatch(setNavText("Invites"));
  };

  const navLinkStyle = ({ isActive }) => {
    return {
      textDecoration: isActive ? "none" : "underline",
    };
  };
  const pendingRequests = receivedRequests?.filter(
    (request) => request?.requestDetail === "pending"
  );
  const _pendingRequests = sentRequests?.filter(
    (request) => request?.requestDetail === "pending"
  );
  const totaPending = pendingRequests?.length + _pendingRequests?.length;

  const { setIsOpen } = useTour();

  return (
    <div className="user-navbar-container">
      <DeleteModal
        open={confirmModal}
        handleClose={() => setConfirmModal(false)}
        confirmDeleteHandler={userLogoutHandler}
      />
      <nav className="navbar navbar-expand-lg navbar-custom ">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={refreshHandler}>
            Gaming <br /> Plateform
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            data-target="#navbarSupportedContent"
            data-toggle="collapse"
            type="button"
          >
            <span className="navbar-toggler-icon">
              <i
                className="fa fa-navicon"
                style={{ color: "#fff", fontSize: "28px" }}
              ></i>
            </span>
          </button>

          <div className="justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <Button
                sx={{
                  "& .MuiTouchRipple-root": {
                    color: "#ea8744",
                  },
                }}
              >
                <NavLink
                  to="/user/games"
                  className="nav-link header-nav fifth-step"
                >
                  Games
                </NavLink>
              </Button>
              <Button
                sx={{
                  "& .MuiTouchRipple-root": {
                    color: "#ea8744",
                  },
                }}
              >
                <NavLink
                  to="/user/grand-prix"
                  className="nav-link header-nav sixth-step"
                >
                  Grand Prix
                </NavLink>
              </Button>
              <Button
                sx={{
                  "& .MuiTouchRipple-root": {
                    color: "#ea8744",
                  },
                }}
              >
                <NavLink to="/user/rules" className="nav-link header-nav">
                  Rules
                </NavLink>
              </Button>
              <li className="nav-item">
                <form className="form-inline">
                  <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <span
                      className="form-control-feedback form-control-cross"
                      onClick={searchClearHandler}
                    >
                      <CloseIcon />
                    </span>
                    <div className="eighth-step">
                      <span className="parent-search">
                        <input
                          className="form-control header-search"
                          placeholder="Search"
                          type="text"
                          value={searchVal}
                          onChange={(e) => searchHandler(e.target.value)}
                        />

                        {searchVal && (
                          <Box className="header-box">
                            <Grid container sx={{ color: "white" }}>
                              <Grid item md={12} className="header-box-scroll">
                                {users?.length > 0 ? (
                                  users?.map((x, i) => {
                                    return (
                                      <Grid
                                        container
                                        paddingX="6%"
                                        paddingTop="5%"
                                        alignItems="center"
                                        sx={{ cursor: "pointer" }}
                                        onClick={() => userClickHandler(x._id)}
                                      >
                                        <Grid item md={3}>
                                          <img
                                            alt=" "
                                            src={
                                              x.profileImage
                                                ? BASE_URL + x.profileImage
                                                : profileIconImg
                                            }
                                            className={"leaderIcon"}
                                          />
                                        </Grid>
                                        <Grid item md={9}>
                                          <Typography m={0} fontSize="14px">
                                            {tooltipTrim(
                                              x.userDetail.userName,
                                              15
                                            )}
                                          </Typography>
                                          <Box lineHeight=".4">
                                            <Typography
                                              m={0}
                                              variant="span"
                                              fontSize="9px"
                                            >
                                              {tooltipTrim(
                                                x.userDetail.fullName,
                                                15
                                              )}
                                            </Typography>
                                            {friendIds?.includes(x._id) && (
                                              <Typography
                                                variant="span"
                                                color="#ea8744"
                                                fontSize="9px"
                                              >
                                                &nbsp; - Friend
                                              </Typography>
                                            )}
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    );
                                  })
                                ) : (
                                  <Typography
                                    marginY={"30%"}
                                    textAlign="center"
                                    fontSize="20px"
                                    color="white"
                                  >
                                    No Data
                                  </Typography>
                                )}
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </span>
                    </div>
                    <span className="user-notif">
                      <Link
                        className="bt"
                        to="user/invites"
                        onClick={(e) => notifClickHandler(e)}
                      >
                        <img height="30px" src={MaskGp280} width="30px" />
                        {!!totaPending ? <span className="dot"></span> : ""}
                      </Link>
                    </span>
                    <Tooltip title="Log out">
                      <div
                        className="user-header-signout"
                        onClick={() => setConfirmModal(true)}
                      >
                        <img alt="" src={signout} />
                      </div>
                    </Tooltip>
                  </div>
                </form>
              </li>
              {/* ///  <iframe src="https://discord.com/channels/1004457111788462152/1004457111788462155" height="300" width="300" /> */}
              <NavLink
                to="/chat"
                className="nav-link header-nav sixth-step"
              >
                Live chat
              </NavLink>
              <Button
                style={{
                  color: "#ea8744",
                  border: "1px solid",
                  marginLeft: "15px",
                }}
                variant="outlined"
                onClick={() => setIsOpen(true)}
              >
                Tour
              </Button>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
