import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { ButtonBase, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";

import profile from "../../../assets/Ellipse 5@2x.png";
import dropdown from "../../../assets/dropdown.png";
import signout from "../../../assets/Sign out.svg";
import { lowerDashJoinStr, allWordsCapitalize } from "../../../utils/apiutils";
import DeleteModal from "../../components/DeleteModal/deletemodal";
import "./index.css";
import HeaderDropdown from "../../components/Input/headerDropdown";
import { useDispatch } from "react-redux";
import { logout } from "../../../User/layout/header/reducers";

const Navigations = [
  "Dashboard",
  "Grand Prix",
  "GP Leagues",
  "Fantasy Leagues",
  "Users",
  "Games",
  "Tournaments",
  "Ladders",
];
const profImgPath = process.env.REACT_APP_BASE_URL + "/Uploads/adminpic.jpg";
const ResultMenu = [
  "Tournament Results",
  "Ladder Results",
  "Total War Ladder Results",
  "Match Results",
  "GP League Results",
];

const Index = () => {
  const dispatch = useDispatch();
  const [selectedHeader, setSelectedHeader] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params["*"]) {
      let path = params["*"]?.split("/")[1];
      path = allWordsCapitalize(path?.split("-")?.join(" "));
      setSelectedHeader(path);
    }
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("adminToken");
    window.location.replace("/auth/login");
  };
  const logoClickHandler = () => {
    navigate("/admin/dashboard");
    setSelectedHeader("Dashboard");
  };
  return (
    <div className="admin-nav-bar">
      <DeleteModal
        open={confirmModal}
        handleClose={() => setConfirmModal(false)}
        confirmDeleteHandler={logoutHandler}
      />
      <nav className="navbar navbar-expand-lg admin-navbar-custom ">
        <div className="container-fluid">
          <span className="navbar-brand" onClick={logoClickHandler}>
            Gaming <br /> Plateform
          </span>
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
              {Navigations.map((x, i) => (
                <li className={`nav-item`} key={i}>
                  <Link
                    className="nav-link header-nav"
                    to={`/admin/${lowerDashJoinStr(x)}`}
                    onClick={() => setSelectedHeader(x)}
                  >
                    <ButtonBase centerRipple={true}>
                      <span
                        className={`${
                          selectedHeader === x ? "LHeader-active" : "null"
                        }`}
                      >
                        {x}
                      </span>
                    </ButtonBase>
                  </Link>
                </li>
              ))}
              <HeaderDropdown
                title="Results"
                elems={ResultMenu}
                // selectedHeader={selectedHeader}
                setSelectedHeader={setSelectedHeader}
              />
              <li className="nav-item">
                <form className="form-inline">
                  <div className="form-group has-search">
                    <span>
                      <div className="header-bt" type="submit">
                        <PhotoProvider>
                          <PhotoView src={profImgPath}>
                            <img
                              height="30px"
                              src={profImgPath}
                              width="30px"
                              className="admin-prof-pic"
                            />
                          </PhotoView>
                        </PhotoProvider>
                        <Tooltip title="Log out">
                          <span
                            className="admin-header-signout"
                            onClick={() => setConfirmModal(true)}
                          >
                            <img alt="" src={signout} />
                          </span>
                        </Tooltip>
                      </div>
                    </span>
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
