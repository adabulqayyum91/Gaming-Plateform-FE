import React, { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import jwt_decode from "jwt-decode";
import AdminLayout from "./Admin/layout/index";
import UserLayout from "./User/layout/index";
import Profile from "./User/pages/Profile";
import FantasyLeague from "./User/pages/Fantasy/FantasyLeague";
import FantasyLeagueProfile from "./User/pages/Fantasy/FantasyLeagueProfile";
import GameProfile from "./User/pages/GameProfile";
import TournamentProfile from "./User/pages/TournamentProfile";
import LadderProfile from "./User/pages/LadderProfile";
import TeamProfile from "./User/pages/TeamProfile";
import Teams from "./User/pages/Teams";
import MyMatches from "./User/pages/Matches";
import Invites from "./User/pages/Invites";
import UserGames from "./User/pages/Games";
import Rules from "./User/pages/Rules";
import SearchUserProfile from "./User/pages/SearchUserProfile";
import MatchProfile from "./User/pages/MatchProfile";
import Franchise from "./User/pages/Franchise/Profile";
import FranchiseTeamProfile from "./User/pages/Franchise/TeamProfile";
import FranchiseTournamentProfile from "./User/pages/Franchise/TournamentProfile";
import FranchiseNonOwnerProfile from "./User/pages/Franchise/NonOwnerProfile";
import FranchiseLeagueProfile from "./User/pages/Franchise/LeagueProfile";
import Users from "./Admin/pages/Users/index";
import Dashboard from "./Admin/pages/Dashboard/index";
import Games from "./Admin/pages/Games/index";
import Tournaments from "./Admin/pages/Tournaments/index";
import Ladders from "./Admin/pages/Ladders/index";
import LaddersResults from "./Admin/pages/LaddersResults";
import TotalWarLaddersResults from "./Admin/pages/LaddersWarResults";
import TournamentsResults from "./Admin/pages/TournamentsResults";
import MatchesResults from "./Admin/pages/MatchResults";
import Franchises from "./Admin/pages/Franchises";
import Leagues from "./Admin/pages/Leagues";
import FantasyLeagues from "./Admin/pages/FantasyLeagues";
import GPLeaguesResults from "./Admin/pages/GPLeagueResults";
import GeneralText from "./User/components/generalText/generalText";
import Index from "./User/layout/sidebar";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "./User/layout/header/reducers";
import DiscordChat from "./User/pages/Home/DiscordChat";

//Global Style
//Best for the cusomization of interhtml or any kind of HTML throughout the website
//like example below, But you can change it if you want at the component level
const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiInputBase-root , .MuiInput-root": {
        color: "white",
      },
    },
  };
});

export default function root() {
  const redirect = useNavigate();
  const [step, setStep] = useState(0);

  const setCurrentStep = (step) => {
    switch (step) {
      case 0:
        redirect("/user/games", true);
        break;
      case 1:
        redirect("/Example", true);
        break;
      default:
        break;
    }
    setStep(step);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const params = useParams();
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    if (!userToken && !adminToken) {
      localStorage.setItem("navText", "Profile");
      navigate("/home");
    }
    if (userToken && params["*"] === "") {
      navigate("/user/profile");
    }
    if (adminToken && params["*"] === "") {
      navigate("/admin/dashboard");
    }
  }, []);

  useEffect(() => {
    const logout = () => {
      dispatch(logoutAction());
      setTimeout(() => {
        localStorage.getItem("userToken") &&
          localStorage.removeItem("userToken");
        localStorage.getItem("user_id") && localStorage.removeItem("user_id");
        localStorage.getItem("adminToken") &&
          localStorage.removeItem("adminToken");
        localStorage.setItem("navText", "Profile");
        window.location.replace("/auth/login");
      }, 300);
    };

    const token = localStorage.getItem("userToken")
      ? localStorage.getItem("userToken")
      : localStorage.getItem("adminToken");

    if (token) {
      let decodedJwt = jwt_decode(token);
      let logoutSecs = decodedJwt.exp * 1000 - Date.now();
      if (logoutSecs <= 0) logoutSecs = 0;
      setTimeout(() => {
        logout();
      }, logoutSecs);
    }
  }, [location]);

  const pathsControl = () => {
    return (
      <>
        {/* show auth/login when both are signedout, if either one is signedin dont show it */}
        {adminToken && (
          <AdminLayout>
            <Routes>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/games" element={<Games />} />
              <Route path="/admin/tournaments" element={<Tournaments />} />
              <Route path="/admin/ladders" element={<Ladders />} />
              <Route
                path="/admin/tournament-results"
                element={<TournamentsResults />}
              />
              <Route path="/admin/results" element={<TournamentsResults />} />
              <Route
                path="/admin/ladder-results"
                element={<LaddersResults />}
              />
              <Route
                path="/admin/total-war-ladder-results"
                element={<TotalWarLaddersResults />}
              />
              <Route path="/admin/match-results" element={<MatchesResults />} />
              <Route path="/admin/grand-prix" element={<Franchises />} />
              <Route path="/admin/gp-leagues" element={<Leagues />} />
              <Route
                path="/admin/fantasy-leagues"
                element={<FantasyLeagues />}
              />
              <Route
                path="/admin/gp-league-results"
                element={<GPLeaguesResults />}
              />
              <Route
                path="*"
                element={
                  <GeneralText text="404. Page Not Found!" height="70vh" />
                }
              />
            </Routes>
          </AdminLayout>
        )}

        {userToken && (
          <UserLayout>
            <Routes>
              <Route path="/auth/login" element={<Users />} />
              <Route path="/user/profile" element={<Profile />} />

              <Route path="/user/fantasy-league" element={<FantasyLeague />} />
              <Route path="/user/games" element={<UserGames />} />
              <Route path="/user/rules" element={<Rules />} />
              <Route
                path="/user/search-user-profile/:id"
                element={<SearchUserProfile />}
              />
              <Route path="/user/game/:id" element={<GameProfile />} />
              <Route
                path="/user/tournament/:id"
                element={<TournamentProfile />}
              />
              <Route path="/user/ladder/:id" element={<LadderProfile />} />
              <Route path="/user/my-teams" element={<Teams />} />
              <Route path="/user/my-teams/:id" element={<TeamProfile />} />
              <Route path="/user/my-matches" element={<MyMatches />} />
              <Route path="/user/my-matches/:id" element={<MatchProfile />} />
              <Route path="/user/invites" element={<Invites />} />
              <Route path="/user/grand-prix" element={<Franchise />} />

              <Route
                path="/user/grand-prix/:id"
                element={<FranchiseNonOwnerProfile />}
              />
              <Route
                path="/user/grand-prix/team/:id"
                element={<FranchiseTeamProfile />}
              />
              <Route
                path="/user/grand-prix/tournament/:id"
                element={<FranchiseTournamentProfile />}
              />
              <Route
                path="/user/grand-prix/league/:id"
                element={<FranchiseLeagueProfile />}
              />
              <Route
                path="/user/fantasy-leagues/:id"
                element={<FantasyLeagueProfile />}
              />
              <Route
                path="*"
                element={<GeneralText text="404, Page Not Found!" />}
              />
              <Route path='/chat' element={<DiscordChat />} />
            </Routes>
          </UserLayout>
        )}
      </>
    );
  };

  return <div className={classes.root}>{pathsControl()}</div>;
}
