import React, { useState } from "react";
import { Checkbox, IconButton, TableCell, TableRow } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Edit as EditIcon } from "@mui/icons-material";

import { tooltipTrim } from "../../../../utils/apiutils";
import acceptImg from "../../../../assets/Mask Group 285.svg";
import declineImg from "../../../../assets/Mask Group 286.svg";
import lockedImg from "../../../../assets/locked icon.svg";
import unLockedImg from "../../../../assets/unlocked icon.svg";

const MyTblRow = ({
  row,
  index,
  labelId,
  isItemSelected,
  handleClick,
  approveDisaproveModalHandler,
}) => {
  const [eyeValue, setEyeValue] = useState(true);

  const BlockIcon = ({ icon, values }) => {
    return (
      <img
        alt=" "
        src={icon}
        height="30px"
        width="30px"
        style={{ cursor: "pointer" }}
        onClick={() => approveDisaproveModalHandler(values)}
      />
    );
  };

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row._id}
        selected={isItemSelected}
        style={{
          backgroundColor: index % 2 == 0 ? "#4A4A4A" : "#282828",
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            onClick={(event) => handleClick(event, row._id)}
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell align="center">
          {tooltipTrim(row?.franchiseName, 20)}
        </TableCell>
        <TableCell align="center">
          {tooltipTrim(row?.franchiseOwner, 20)}
        </TableCell>
        <TableCell align="center">{row?.totalTeams}</TableCell>
        <TableCell align="center">{tooltipTrim(row?.occupation, 20)}</TableCell>
        <TableCell align="center">{row?.yearlyIncome}</TableCell>
        <TableCell align="center">{tooltipTrim(row?.address, 20)}</TableCell>
        <TableCell align="center">
          {row.isBlock === true ? (
            <BlockIcon
              icon={lockedImg}
              values={{
                franchiseId: row._id,
                status: false,
              }}
            />
          ) : (
            <BlockIcon
              icon={unLockedImg}
              values={{
                franchiseId: row._id,
                status: true,
              }}
            />
          )}
        </TableCell>
        <TableCell align="center">
          {(row.approvedStatus === "approved" ||
            row.approvedStatus === "pending" ||
            eyeValue === false) && (
            <img
              alt=" "
              src={acceptImg}
              height="30px"
              width="30px"
              style={{ cursor: "pointer" }}
              onClick={() =>
                approveDisaproveModalHandler({
                  franchiseId: [row._id],
                  approvedStatus: "approved",
                })
              }
            />
          )}
          {(row.approvedStatus === "disapproved" ||
            row.approvedStatus === "pending" ||
            eyeValue === false) && (
            <img
              alt=" "
              src={declineImg}
              height="30px"
              width="30px"
              style={{ cursor: "pointer" }}
              onClick={() =>
                approveDisaproveModalHandler({
                  franchiseId: [row._id],
                  approvedStatus: "disapproved",
                })
              }
            />
          )}
          {row.approvedStatus !== "pending" && eyeValue === true && (
            <IconButton onClick={() => setEyeValue(false)}>
              <EditIcon style={{ color: "#A4A4A4" }} />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default MyTblRow;
