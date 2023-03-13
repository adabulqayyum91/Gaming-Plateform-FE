import React from "react";
import GeneralText from "../../../../components/generalText/generalText";

import SmartCard from "../../../components/smartCard/smartCard";

export default function Tournaments({ tournaments }) {
  return (
    <>
      {tournaments.length ? (
        tournaments.map((card, i) => <SmartCard key={i} />)
      ) : (
        <GeneralText text="No Tournaments Found!" />
      )}
    </>
  );
}
