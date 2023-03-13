import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { createTeam, getTeams } from "./reducers";
import TeamTile from "./components/teamTile/teamTile";
import DynamicButton from "../../components/dynamicButton/dynamicButton";
import AddTeamModal from "../../components/addTeamModal/addTeamModal";
import teamProfile from "../../../assets/teamprofile.png";
import GeneralText from "../../components/generalText/generalText";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function Teams() {
  const [addTeam, setAddTeam] = useState();
  const dispatch = useDispatch();

  const { teams } = useSelector((state) => state.userTeams);

  useEffect(() => {
    dispatch(getTeams());
  }, []);
  const createTeamHanlder = (values) => {
    dispatch(createTeam(values));
    setAddTeam(false);
  };
  const closeHanlder = () => {
    setAddTeam(false);
  };

  return (
    <>
      <AddTeamModal
        open={addTeam}
        handleClose={closeHanlder}
        handleCreateTeam={createTeamHanlder}
      />
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="span" sx={{ color: "white", fontSize: 24 }}>
          Teams
        </Typography>
        <Box>
          <DynamicButton
            title="Add"
            clickHandler={() => setAddTeam(true)}
            pl="20px"
            pr="20px"
            pt="5px"
            pb="5px"
            color={true}
          />
        </Box>
      </Grid>
      {teams.length ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container mt={2} spacing={2}>
            {teams.map((team, i) => {
              const teamImg = team.teamTitleImage
                ? BASE_URL + team.teamTitleImage
                : teamProfile;
              return (
                <Grid item key={i} md={12 / 3} lg={12 / 4} xl={12 / 5}>
                  <Link to={"/user/my-teams/" + team._id}>
                    <TeamTile
                      title={team.teamViewName}
                      img={teamImg}
                      win={team.winsCount}
                      loss={team.lossCount}
                    />
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        <GeneralText text="No Teams Found!" />
      )}
    </>
  );
}
