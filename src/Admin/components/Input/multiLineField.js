import React from "react";
import TextField from "@mui/material/TextField";
import "./input.css";

export default function multiLineField({ placeholder, name, onchange, value, rows }) {
  return (
    <>
      <div className="form-group">
        <div className="input-group">
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-flexible"
            variant="standard"
            name={name}
            label={placeholder}
            multiline
            maxRows={5}
            rows={rows ? rows : 1}
            value={value}
            onChange={onchange}
          />
        </div>
      </div>
      <br />
    </>
  );
}
