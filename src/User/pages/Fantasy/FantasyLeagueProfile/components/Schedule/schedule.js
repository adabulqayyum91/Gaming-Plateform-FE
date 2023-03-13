import React from "react";

import RoundTable from "./components/roundTable";
import GeneralText from "../../../../../components/generalText/generalText";

export default function Schedule({ leagueScheduleData }) {
  const singleRound = leagueScheduleData?.data[0];
  const data = leagueScheduleData?.data;
  const roundNo = singleRound?.roundNumber;

  return (
    <>
      {singleRound?.matches?.length ? (
        // <RoundTable
        //   matches={singleRound?.matches}
        //   roundNo={roundNo}
        //   leagueScheduleData={data}
        // />
        <GeneralText text="No Schedule Found. Schedule will be auto generated on completion of all teams" />

      ) : (
        <GeneralText text="No Schedule Found. Schedule will be auto generated on completion of all teams" />
      )}
    </>
  );
}
