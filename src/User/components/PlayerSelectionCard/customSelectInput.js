import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { capitalize } from "../../../utils/apisauce";
import { Typography } from "@mui/material";
import classes from "./playerSelectionCard.module.scss";
import { tooltipTrim } from "../../../utils/apiutils";

export default function CustomSelectInput({
  placeholder,
  name,
  type,
  required,
  onchange,
  value,
  items,
  icon,
  pts,
  disabled,
  keyname1,
  keyname2,
}) {
  return (
    <>
      <div className={classes.formGroup}>
        <div className={classes.inputGroup}>
          {!value ? (
            <Typography variant="p" color="whitesmoke" pt={1}>
              Select Player *
            </Typography>
          ) : (
            <>
              <Typography
                variant="span"
                color="whitesmoke"
                pt={1}
                textAlign="left"
              >
                {tooltipTrim(value, 15)}
              </Typography>
              {!items?.length && (
                <Typography
                  variant="span"
                  color="whitesmoke"
                  pt={1}
                  textAlign="right"
                >
                  {pts}
                </Typography>
              )}
            </>
          )}
          {items?.length ? (
            <FormControl>
              <Select
                name={name}
                sx={{
                  "& .MuiSvgIcon-root": {
                    color: "white !important",
                  },
                  "&::before , ::after": {
                    border: "none",
                  },
                  "&:hover": {
                    border: "none",
                  },
                }}
                required={required}
                variant="standard"
                value={""}
                onChange={onchange}
                disabled={disabled}
              >
                {items.length &&
                  items?.map((item) => (
                    <MenuItem
                      key={item._id}
                      value={item[keyname1]}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{capitalize(item[keyname1])}</span>&nbsp;&nbsp;
                      <span>{item.userPoints} pts</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          ) : (
            ""
          )}
        </div>
      </div>
      <br />
    </>
  );
}
