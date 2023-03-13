import React from "react";
import coin from "../../../assets/Group 15.svg";
import "./creditsField.scss";

export default function input({ name, errors, required, onchange, value }) {
  return (
    <>
      <div className="form-group credits-form">
        <div className="input-group">
          {/* <img src={coin} /> */}$
          <input
            className="credits-input"
            placeholder={"0000"}
            name={name}
            type="text"
            maxLength="4"
            required={required}
            onChange={onchange}
            value={value}
          />
        </div>
      </div>
      <p
        style={{
          marginBottom: "10px",
          color: errors && errors[name] ? "#DF4646" : "#767676",
        }}
      >
        Enter only numbers
      </p>
      <br />
    </>
  );
}
