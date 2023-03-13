import React, { useEffect, useState } from "react";

import RoundTable from "./components/roundTable";
import GeneralText from "../../../../../components/generalText/generalText";
import { MatchData } from "./components/match";

export default function Schedule({ leagueScheduleData, id }) {
  const data = [...leagueScheduleData?.data];
  let [matchData, setMatchData] = useState(MatchData)

  return (
    <>
      {matchData?.length ? (
        <RoundTable
          id={id}
          matches={matchData}
        />
      ) : (
        <GeneralText text="No Schedule Found. Schedule will be auto generated on completion of all teams" />
      )}
    </>
  );
}
