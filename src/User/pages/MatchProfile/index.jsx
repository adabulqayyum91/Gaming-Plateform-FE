import { Grid, Typography, IconButton, Box } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import tourBackImg from "../../../assets/tourback.png";
import prizeCupLarge from "../../../assets/prizeCupLarge.svg";
import pricePoolImg from "../../../assets/Group 16.svg";
import PrimaryButton from "../../components/primaryButton/primaryButton";
import { addResult, getMatch } from "./reducers";
import { allWordsCapitalize, dateFormate } from "../../../utils/apiutils";
import UploadResultModal from "../../components/uploadResultModal/uploadResultModal";
import PlayerTile from "./components/playerTile/playerTile";
import classes from "./index.module.scss";
import { capitalize } from "../../../utils/apisauce";

import './style.css';
import General from "../Rules/components/General";
const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function MatchProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resultModal, setResultModal] = useState(false);
  const [BackImg, setBackImg] = useState(tourBackImg);
  const { match } = useSelector((state) => state.userMatchProfile);
  const [tab, setTab] = useState("Game");

  const { id } = useParams();

  useLayoutEffect(() => {
    match.matchTitleImage
      ? setBackImg(BASE_URL + match.matchTitleImage)
      : setBackImg(tourBackImg);
  }, [match]);
  useLayoutEffect(() => {
    dispatch(getMatch({ id: id }));
  }, []);

  const handleClose = () => {
    setResultModal(false);
  };
  const handleUploadResult = (values) => {
    dispatch(addResult(values));
    setResultModal(false);
  };

  const { challengeBy, challengeTo } = match;
  const Tabs = ["Game", "Rules"];

  return (
    <>
      <UploadResultModal
        id={id}
        open={resultModal}
        name={match.matchName}
        titleImage={BackImg}
        teamId=""
        formFieldName={"matchId"}
        handleClose={handleClose}
        handleUploadResult={handleUploadResult}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid
            item
            md={12}
            className={classes.topSection}
            style={{
              backgroundImage: `url('${BackImg}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <IconButton
              onClick={() => navigate(-1)}
              className={classes.backChevron}
            >
              <ChevronLeftIcon sx={{ color: "#F26826", pb: "3px" }} />
            </IconButton>
            <Grid container className={classes.matchProfileImg}>
              <Grid item md={6}>
                <Box className={classes.matchStartingBar}>
                  {dateFormate(match.startDate)} <br />
                  STARTING AT &nbsp;
                  <span className={classes.timetext}>
                    {match.startTime} UTC
                  </span>
                </Box>
              </Grid>
              {challengeBy?.resultStatus == "" && (
                <Grid item md={6} className={classes.joinButton}>
                  <PrimaryButton
                    title="Add Result"
                    clickHandler={() => setResultModal(true)}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item md={12} py={2}>
            <Typography
              component="p"
              color="white"
              className={classes.matchName}
            >
              {allWordsCapitalize(match.matchName)}
            </Typography>
            <Typography color="#767676">
              Hosted By: &nbsp;
              <Typography component="span" color="#F26826">
                {capitalize(match.hostedBy)}
              </Typography>
            </Typography>
          </Grid>
          <Grid container className={classes.bottomContainer}>
            <Grid item md={8} className={classes.centerBar}>
              <Box style={{ float: "left", marginTop: "1%", marginBottom: "2%", }}>
                {Tabs.map((x) => (
                  <Typography
                    component="span"
                    className={tab === x ? classes.styledTab : classes.tabType}
                    onClick={() => setTab(x)}
                  >
                    {allWordsCapitalize(x)}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Grid item md={12}>
            {tab == 'Game' ?
              match && (
                <Grid container className={classes.bottomBar}>
                  <Grid item md={4}>
                    {
                      <PlayerTile
                        resultStatus={challengeBy?.resultStatus}
                        profileImg={challengeBy?.profileImage}
                        userName={challengeBy?.userName}
                        matches={challengeBy?.matches}
                        win={challengeBy?.win}
                        winPerc={challengeBy?.winPercentage}
                        loss={challengeBy?.loss}
                      />
                    }
                  </Grid>
                  <Grid item md={4} className={classes.prizeBox}>
                    <Box textAlign="center">
                      <img src={prizeCupLarge} />
                      <br />
                      <Typography fontSize="36px">
                        <img src={pricePoolImg} height="21px" />
                        {match.prize}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md={4} className={classes.winningBox}>
                    {
                      <PlayerTile
                        resultStatus={challengeTo?.resultStatus}
                        profileImg={challengeTo?.profileImage}
                        userName={challengeTo?.userName}
                        matches={challengeTo?.matches}
                        win={challengeTo?.win}
                        winPerc={challengeTo?.winPercentage}
                        loss={challengeTo?.loss}
                      />
                    }
                  </Grid>
                </Grid>

              )
              : <Grid container className={classes.bottomBar}>
                <h3>
                  Match Rules
                </h3>
                <br />
                {match.matchRules?.length > 2 ? <p>
                  {match.matchRules}
                </p> : <General />}

              </Grid>}

          </Grid>
        </Grid>
      </Box>
    </>
  );
}
