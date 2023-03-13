import React from "react";
import { TextField } from "@mui/material";

import "./input.css";

export default function input({
  placeholder,
  name,
  type,
  required,
  disabled,
  onchange,
  value,
  icon,
}) {
  return (
    <>
      {type !== "number" ? (
        <div className="form-group">
          <div className="input-group">
            <TextField
              style={{ width: "100%" }}
              variant="standard"
              name={name}
              type={type}
              value={value}
              onChange={onchange}
              required={required}
              label={placeholder}
              disabled={disabled}
            />
            {icon && icon}
          </div>
        </div>
      ) : (
        <div className="form-group">
          <div className="input-group">
            <TextField
              style={{ width: "100%" }}
              variant="standard"
              name={name}
              type={type}
              value={value}
              inputProps={{ min: 0 }}
              onChange={onchange}
              required={required}
              label={placeholder}
              disabled={disabled}
            />
            {icon && icon}
          </div>
        </div>
      )}
      <br />
    </>
  );
}
