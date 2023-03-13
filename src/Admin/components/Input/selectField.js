import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { capitalize } from "../../../utils/apisauce";
import "./input.css";

export default function SelectInput({
  placeholder,
  name,
  type,
  required,
  onchange,
  value,
  items,
  icon,
  disabled,
}) {
  return (
    <>
      <div className="form-group">
        <div className="input-group">
          <FormControl fullWidth>
            {placeholder && (
              <InputLabel
                id="demo-simple-select-standard-label"
                varient="standard"
                required={required}
                sx={{
                  left: "-13px !important",
                  "& .MuiInputLabel-shrink": {
                    color: "red !important",
                  },
                }}
              >
                {placeholder}
              </InputLabel>
            )}
            <Select
              style={{ width: "100%" }}
              name={name}
              sx={{
                "& .MuiSvgIcon-root": {
                  color: "white !important",
                },
              }}
              required={required}
              labelId="demo-simple-select-label"
              id="demo-simple-select-standard"
              variant="standard"
              value={value}
              onChange={onchange}
              disabled={disabled}
            >
              {items?.length && typeof items[0] == "object"
                ? items?.map((item) => (
                    <MenuItem
                      key={item._id}
                      value={"_id" in item ? item._id : item}
                    >
                      {capitalize(item.gameName)}
                    </MenuItem>
                  ))
                : items &&
                  items?.map((item, i) => (
                    <MenuItem
                      key={i}
                      value={item}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{capitalize(item)}</span>
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <br />
    </>
  );
}
