import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";

import DynamicButton from "../../../components/dynamicButton/dynamicButton";
import RosterTeamTile from "../../../components/rosterTeamTile/rosterTeamTile";
import AddTeamModal from "../../../components/addTeamModal/addTeamModal";
import TeamIcon from "../../../../assets/profTeam colored.svg";
import TryoutRequests from "./components/TryoutRequests/TryoutRequests";
import {
  updateTryoutReq,
  addUserToFrancTeam,
  getFranchiseTryouts,
} from "./reducers";
import classes from "./teams.module.scss";
import GeneralText from "../../../components/generalText/generalText";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function Teams({
  data,
  addteam,
  setAddTeam,
  franchiseId,
  closeHanlder,
  isRestricted,
  createFranchiseTeamHanlder,
  deleteTeamHandler,
}) {
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState("Add Team");

  const { tryouts } = useSelector((state) => state.userFranchiseTeams);

  useEffect(() => {
    dispatch(getFranchiseTryouts({}));
  }, []);
  const handleChangePage = (event, newPage) => {
    let newPageCpy = newPage;
    dispatch(getFranchiseTryouts({ query: "", pageNo: ++newPageCpy }));
  };

  const tryoutAndAddButtonHandler = (selectedText) => {
    setSelectedButton(selectedText);
    if (selectedText === "Add Team") setAddTeam(true);
  };
  const requestHandler = (val) => {
    dispatch(updateTryoutReq(val));
  };
  const addtoTeamHandler = (val) => {
    dispatch(
      addUserToFrancTeam({
        ...val,
        franchiseId: franchiseId,
      })
    );
  };

  return (
    <>
      <AddTeamModal
        open={addteam}
        handleClose={closeHanlder}
        handleCreateTeam={createFranchiseTeamHanlder}
      />
      <Grid className="far-apart-center" width="100%">
        <Typography component="span" sx={{ color: "white", fontSize: 24 }}>
          {selectedButton === "Tryout Requests" ? (
            <IconButton onClick={() => setSelectedButton("Add Team")}>
              <ChevronLeftIcon sx={{ color: "#F26826", pb: "3px" }} />
            </IconButton>
          ) : (
            <></>
          )}
          {selectedButton === "Add Team" ? "Teams" : "Tryout Requests"}
        </Typography>
        {!isRestricted && (
          <Box>
            <DynamicButton
              title="Tryout Requests"
              clickHandler={() => tryoutAndAddButtonHandler("Tryout Requests")}
              pl="20px"
              pr="20px"
              pt="5px"
              pb="5px"
              color={selectedButton === "Tryout Requests" ?? false}
            />
            &nbsp;&nbsp;
            <DynamicButton
              title="Add Team"
              clickHandler={() => tryoutAndAddButtonHandler("Add Team")}
              pl="20px"
              pr="20px"
              pt="5px"
              pb="5px"
              color={selectedButton === "Add Team" ?? false}
            />
          </Box>
        )}
      </Grid>
      {selectedButton !== "Tryout Requests" ? (
        <Grid item md={12} sx={{ paddingLeft: "0px !important" }}>
          <Grid container>
            <Grid item md={12} className={classes.teamsRosterBar}>
              {data && data.length ? (
                <Grid container spacing={2}>
                  {data.map((x, i) => (
                    <Grid item key={i} md={12 / 2} lg={12 / 3} xl={12 / 4}>
                      <RosterTeamTile
                        id={x._id}
                        link={`/user/grand-prix/team/${x._id}`}
                        title={x.teamViewName}
                        img={
                          x.teamTitleImage
                            ? BASE_URL + x.teamTitleImage
                            : TeamIcon
                        }
                        kickoutHanlder={deleteTeamHandler}
                        loss={x?.lossCount}
                        win={x?.winsCount}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <GeneralText text="No Teams Found!" />
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <TryoutRequests
          data={tryouts?.data}
          requestHandler={requestHandler}
          addtoTeamHandler={addtoTeamHandler}
          handleChangePage={handleChangePage}
          total={tryouts?.total}
          page={tryouts?.page}
        />
      )}
    </>
  );
}
