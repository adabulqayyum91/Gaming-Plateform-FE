import React, { useState } from "react";
import { Box } from "@mui/material";

import Requests from "../Requests/requests";
import useTable from "../../../../../components/UseTable/useTable";
import GeneralText from "../../../../../components/generalText/generalText";

export default function TryoutRequests({
  data,
  requestHandler,
  addtoTeamHandler,
  handleChangePage,
  total,
  page,
}) {
  const { UserPagination, ComponentContainer } = useTable();

  let pageCpy = page;
  return (
    <ComponentContainer>
      {data && data.length ? (
        <Box mt={5}>
          {data?.map((x, i) => (
            <Requests
              id={x._id}
              key={x._id}
              date={x.date}
              time={x.time}
              user={x.user}
              team={x.team}
              status={x.status}
              createdAt={x.createdAt}
              isAddedToTeam={x.isAddedToTeam}
              requestHandler={requestHandler}
              addtoTeamHandler={addtoTeamHandler}
            />
          ))}
          <UserPagination
            page={--pageCpy}
            data={total}
            handleChangePage={handleChangePage}
          />
        </Box>
      ) : (
        <GeneralText text="No Requests Found!" />
      )}
    </ComponentContainer>
  );
}
