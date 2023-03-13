import React, { useState, useEffect } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import { Grid } from "@mui/material";

import gp15 from "../../../assets/Group 15.svg";
import InvitesIcon from "../../../assets/Group 1590.svg";
import fleagueColoredIcon from "../../../assets/flColored.svg";
import fleagueIcon from "../../../assets/flNoColored.png";
import ProfileIcon from "../../../assets/My Team (1).svg";
import MyMatchesIcon from "../../../assets/MY Matches.svg";
import MyTeamIcon from "../../../assets/My Team.svg";
import profileIconImg from "../../../assets/teamprofile.png";
import InvitesIconColored from "../../../assets/add teamGroup 1591 colored.svg";
import MyTeamIconColored from "../../../assets/My Team colored.svg";
import MyMatchesIconColored from "../../../assets/MY Matches colored.svg";
import ProfileIconColored from "../../../assets/profTeam colored.svg";
import GeneralModal from "../../../common/generalModal/generalModal";
import PaymentModal from "../../../common/PaymentModal/PaymentModal";
import Button from "@mui/material/Button";
// import TourProvider from '@reactour/tour';

import { useTour } from "@reactour/tour";

import {
  lowerDashJoinStr,
  tooltipNumber,
  tooltipTrim,
  allWordsCapitalize,
} from "../../../utils/apiutils";

import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setNavText } from "../header/reducers";

const SIDEBAR = [
  {
    item: "My Matches",
    icon: MyMatchesIcon,
    iconColored: MyMatchesIconColored,
  },
  { item: "My Teams", icon: MyTeamIcon, iconColored: MyTeamIconColored },
  { item: "Invites", icon: InvitesIcon, iconColored: InvitesIconColored },
  { item: "Profile", icon: ProfileIcon, iconColored: ProfileIconColored },
  {
    item: "Fantasy League",
    icon: fleagueIcon,
    iconColored: fleagueColoredIcon,
  },
];
const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

const Index = ({ profile }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState('withdraw');

  const { headerText } = useSelector((state) => state.userHeader);

  useEffect(() => {
    if (params["*"]) {
      const path = localStorage.getItem("navText");
      dispatch(setNavText(path));
    }
  }, []);

  const { setIsOpen } = useTour();

  const sidebarTextHandler = (val) => {
    localStorage.setItem("navText", val);
    dispatch(setNavText(val));
  };

  const profileImage = profile?.profileImage
    ? BASE_URL + profile?.profileImage
    : profileIconImg;
  return (
    <>
      <PaymentModal
        text="Coming Soon!"
        open={modalOpen}
        type={type}
        handleClose={() => setModalOpen(false)}
      />
      <Grid
        item
        md={2}
        className="sidebar-container"
        style={{
          width: "200px",
        }}
      >
        <div className="sidebar-upper" style={{ zIndex: "19" }}>
          <div className="sidebar-profilehead">
            <Link
              to={`user/profile`}
              onClick={() => sidebarTextHandler("Profile")}
            >
              <Grid container alignItems="center" justifyContent="left">
                <Grid item md={2}>
                  <img
                    className="sidebar-avatar"
                    height="20px"
                    width="20px"
                    src={profileImage}
                  />
                </Grid>
                <Grid item md={0.2}></Grid>
                <Grid item md={8.5} ml={1}>
                  <span style={{ color: "white", wordBreak: "break-word" }}>
                    {tooltipTrim(profile?.userDetail?.userName, 15)}
                  </span>
                </Grid>
              </Grid>
            </Link>
          </div>

          <div className="sidebar-line"></div>
          <div className="">
            {/* {SIDEBAR.map((x, i) => (
              <Link
                key={i}
                to={`user/${lowerDashJoinStr(x.item)}`}
                onClick={() => sidebarTextHandler(x.item)}
              >
                <button
                  className={`sidebar-menu-button ${
                    headerText === x.item ? 'active' : ''
                  }`}
                >
                  <img
                    height={23}
                    width={23}
                    style={{
                      marginLeft: SIDEBAR.length - 1 === i ? '-2px' : '',
                    }}
                    className={`sidebar-match`}
                    src={headerText === x.item ? x.iconColored : x.icon}
                  />
                  <span>{x.item}</span>
                </button>
              </Link>
            ))} */}

            <div className="side-bar">
              <ul>
                <li>
                  <Button
                    sx={{
                      "& .MuiTouchRipple-root": {
                        color: "#ea8744",
                      },
                    }}
                  >
                    <NavLink
                      to="/user/my-matches"
                      className="navlink second-step"
                    >
                      <img src={MyMatchesIcon} />
                      <span className="navbar-text">My Matches</span>
                    </NavLink>
                  </Button>
                </li>
                <li>
                  <Button
                    sx={{
                      "& .MuiTouchRipple-root": {
                        color: "#ea8744",
                      },
                    }}
                  >
                    <NavLink to="/user/my-teams" className="navlink third-step">
                      <img src={MyTeamIcon} />
                      <span className="navbar-text">My Teams</span>
                    </NavLink>
                  </Button>
                </li>
                <li>
                  <Button
                    sx={{
                      "& .MuiTouchRipple-root": {
                        color: "#ea8744",
                      },
                    }}
                  >
                    <NavLink to="/user/invites" className="navlink">
                      <img src={InvitesIcon} />
                      <span className="navbar-text">Invites</span>
                    </NavLink>
                  </Button>
                </li>
                <li>
                  <Button
                    sx={{
                      "& .MuiTouchRipple-root": {
                        color: "#ea8744",
                      },
                    }}
                  >
                    <NavLink to="/user/profile" className="navlink first-step">
                      <img src={ProfileIcon} />
                      <span className="navbar-text">Profile</span>
                    </NavLink>
                  </Button>
                </li>
                <li>
                  <Button
                    sx={{
                      "& .MuiTouchRipple-root": {
                        color: "#ea8744",
                      },
                    }}
                  >
                    <NavLink
                      to="/user/fantasy-league"
                      className="navlink fourth-step"
                    >
                      <img src={fleagueIcon} width={23} height={23} />
                      <span className="navbar-text">Fantasy League</span>
                    </NavLink>
                  </Button>
                </li>
              </ul>
            </div>

            <div className="sidebar-line"></div>
            <div className="Ninth-step">
              <div className="sidebar-scoreBox">
                <h1>Platform Credits</h1>
                <div className="sidebar-scoreBoxdata">
                  <span>
                    {/* <img alt="" src={gp15} /> */}
                    $
                    {tooltipNumber(
                      profile?.userDetail?.credits
                        ? profile?.userDetail?.credits
                        : 0,
                      7
                    )}
                  </span>
                  <p>
                    <span
                      className="sidebar-withdraw"
                      onClick={() => {
                        setType('withdraw')

                        setModalOpen(true)
                      }}
                    >
                      Withdraw
                    </span>
                    <br />
                    <span
                      style={{
                        color: '#ea8744'
                      }}
                      className="sidebar-withdraw"
                      onClick={() => {
                        setType('cash')
                        setModalOpen(true)
                      }}
                    >
                      Add
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default Index;
