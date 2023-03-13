import React from "react";

import SmartCard from "../../../components/smartCard/smartCard";

export default function Tournaments({ tournaments }) {
  return (
    <>{tournaments && tournaments.map((card, i) => <SmartCard key={i} />)}</>
  );
}
