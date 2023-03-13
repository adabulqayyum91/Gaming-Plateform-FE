import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import CenterBar from "./CenterBar/centerBar";
import Teams from "../../../Teams/teams";
import Tournaments from "../../../Tournaments/tournaments";
import Leagues from "../../../Leagues/leagues";
import Marketplace from "./TabSections/MarketPlace/marketPlace.js";
import Games from "./TabSections/Games/games.js";
// import Rules from "./TabSections/Rules/rules";
import { allWordsCapitalize } from "../../../../../../utils/apiutils";
import {
  createFranchiseTeam,
  getFranchises,
  removeFranchiseTeam,
  updateFranchiseAbout,
} from "../../reducers";
import classes from "./index.module.scss";
import AboutEdit from "../../../../../components/aboutEditModal/aboutEdit";
import { getFranchiseGames } from "../../../Tournaments/reducers";

const Tabs = ["Teams", "Tournaments", "Leagues", "Games", "Marketplace"];

export default function Index({ isRestricted }) {
  const [aboutEdit, setAboutEdit] = useState(false);
  const [tab, setTab] = useState("Teams");
  const [addteam, setAddteam] = useState(false);
  const [type, setType] = useState("All");
  const dispatch = useDispatch();

  const {
    franchise,
    franchise: { franchiseTeams },
    franchises,
  } = useSelector((state) => state.userFranchiseProfile);
  const { games } = useSelector((state) => state.userFranchiseTournaments);

  useEffect(() => {
    let typeCpy = type;
    typeCpy = typeCpy?.split(" ");
    typeCpy = typeCpy[typeCpy?.length - 1]?.toLowerCase();
    if (tab === "Marketplace") {
      dispatch(getFranchises({ franchiseStatus: typeCpy }));
    }
    if (tab === "Games") {
      dispatch(getFranchiseGames());
    }
  }, [tab, type]);

  const createFranchiseTeamHanlder = (values) => {
    values.append("franchiseId", franchise._id);
    dispatch(createFranchiseTeam(values));
    setAddteam(false);
  };
  const deleteTeamHandler = (id) => {
    dispatch(removeFranchiseTeam({ teamId: id }));
  };
  const handleUpdateUser = (val) => {
    dispatch(updateFranchiseAbout(val));
    setAboutEdit(false);
  };
  const statusHandler = (obj) => {
    dispatch(updateFranchiseAbout(obj));
  };
  const closeHanlder = () => {
    setAddteam(false);
    setAboutEdit(false);
  };

  return (
    <>
      <AboutEdit
        about={franchise?.about}
        open={aboutEdit}
        handleClose={closeHanlder}
        handleUpdateUser={handleUpdateUser}
      />
      <CenterBar
        matches={franchise?.matches}
        totalTeams={franchise?.totalTeams}
        franchiseStatus={franchise?.franchiseStatus}
        setAboutEdit={setAboutEdit}
        about={franchise?.about}
        statusHandler={statusHandler}
        isRestricted={isRestricted}
      />
      <Box style={{ float: "left" }}>
        {Tabs.map((x, i) => (
          <Typography
            component="span"
            className={tab === x ? classes.styledTab : classes.tabType}
            onClick={() => setTab(x)}
          >
            {allWordsCapitalize(x)}
          </Typography>
        ))}
      </Box>
      <Grid item md={12}>
        <Grid container spacing={2} className={classes.tabsSection}>
          {tab === Tabs[0] ? (
            <Teams
              franchiseId={franchise._id}
              data={franchiseTeams}
              addteam={addteam}
              setAddTeam={setAddteam}
              closeHanlder={closeHanlder}
              deleteTeamHandler={deleteTeamHandler}
              isRestricted={isRestricted}
              createFranchiseTeamHanlder={createFranchiseTeamHanlder}
            />
          ) : tab === Tabs[1] ? (
            <Tournaments
              franchiseId={franchise._id}
              isRestricted={isRestricted}
            />
          ) : tab === Tabs[2] ? (
            <Leagues franchiseId={franchise._id} isRestricted={isRestricted} />
          ) : tab === Tabs[3] ? (
            <Games
              franchiseId={franchise._id}
              isRestricted={isRestricted}
              data={games}
            />
          ) : (
            <Marketplace
              data={franchises}
              type={type}
              setType={setType}
              franchiseId={franchise._id}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
