import React, { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Typography,
  TableRow,
  TableCell,
  Box,
  Grid,
  IconButton,
} from "@mui/material";

import classes from "../schedule.module.scss";
import versusIcon from "../../../../../../../assets/versus.png";
import UseRoundTable from "../../../../../../components/UseRoundTable/useTable";
import { capitalize } from "../../../../../../../utils/apisauce";
import ScheduleModal from "./scheduleModal";
import { SingleEliminationBracket, DoubleEliminationBracket, Match, MATCH_STATES, SVGViewer } from '@g-loot/react-tournament-brackets';
import { MatchData } from './match'
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


export default function RoundTable(props) {

  let [showmore, setShowmore] = useState(false);
  let [scheduleData, setScheduleData] = useState(props?.matches ? props?.matches : MatchData);
  let [scheduleDataOrignal, setScheduleDataOrignal] = useState(props?.matches);
  useEffect(async () => {
    // setTimeout(() => {
    //   setShowmore(true)
    const token = localStorage.getItem("userToken");
    const getLoad = {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": token }
    };
    let res = await fetch(`https://backend.gamingplateform.com/api/league/schedule?leagueId=${props.id}`, getLoad)
    await res.json().then(data => {
      console.log("res success", data);
      if (data.code == 200) {
        setScheduleData(data.leagueScheduleData)
      }
      // console.log(data.leagueScheduleData);
      console.log("res");
    }).catch(err => {
      console.log("res error");
      console.log(err);
      console.log("res");
    });

    // setScheduleData(data)

  }, [])


  const { height, width } = useWindowDimensions();

  const finalWidth = Math.max(width / 1.40, 500);
  const finalHeight = Math.max(10000, 2000);

  return (
    <>
      {/* <ScheduleModal
        showmore={showmore}
        handleClose={handleClose}
        leagueScheduleData={leagueScheduleData}
        rounds={rounds}
        playoffs={playoffs}
        finals={finals}
      /> */}

      <Box mt={2} className={classes.roundTable}>
        {props?.matches?.length ? (
          <SingleEliminationBracket
            matches={scheduleData}
            matchComponent={Match}
            svgWrapper={({ children, ...props }) => (
              <SVGViewer width={finalWidth}
                height={finalHeight} {...props} >
                {children}
              </SVGViewer>
            )}
          />
        ) : (
          <Grid
            container
            marginY={4}
            justifyContent="end"
            alignItems="center"
            sx={{ fontSize: "20px", color: "#484848" }}
          >
            <span>No Rounds Found! </span>
          </Grid>
        )
        }
      </Box >
    </>
  );
}
// Hook

