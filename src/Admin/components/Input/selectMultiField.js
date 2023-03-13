import React from "react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/system";
import "./input.css";
import { capitalize } from "../../../utils/apisauce";

const MySelect = styled(Select)({
  "& .MuiSvgIcon-root": {
    color: "white !important",
  },
  "& .MuiInputLabel-root": {
    left: "-13px !important",
  },
  "& .MuiInputLabel-root": {
    backgroundColor: "transparent",
  },
});

export default function SelectMultiField({
  placeholder,
  name,
  type,
  required,
  onchange,
  value,
  items,
  icon,
}) {
  const onChangeHandler = (e) => {
    const {
      target: { value },
    } = e;
    onchange(
      name,
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <div className="form-group">
        <div className="input-group">
          <FormControl fullWidth>
            {placeholder && (
              <InputLabel
                id="demo-multiple-name-label"
                varient="standard"
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
            <MySelect
              labelId="demo-multiple-name-label"
              style={{ width: "100%" }}
              name={name}
              multiple
              required={required}
              id="demo-simple-select-standard"
              variant="standard"
              value={value}
              onChange={(e) => onChangeHandler(e)}
            >
              {items?.length &&
                items.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </MySelect>
          </FormControl>
        </div>
      </div>
      <br />
    </>
  );
}
