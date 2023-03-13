import React, { useState } from "react";
import IconUpload from "../../../assets/Mask Group 265.svg";

export default function videoUpload({
  title,
  name,
  required,
  value,
  onchange,
}) {
  const [filename, setFilename] = useState(null);
  const onChangeHandler = (e) => {
    var file = e.target.files[0];
    setFilename(file.name);
    onchange(name, file);
  };

  return (
    <div style={{ textAlign: "left" }}>
      <label htmlFor={`result-vid-upload`}>
        <img src={IconUpload} alt="" />
        {filename ? filename : <span>{title}</span>}
      </label>
      <input
        style={{ display: "none" }}
        id={`result-vid-upload`}
        type="file"
        accept="video/mp4,video/x-m4v,video/*,image/jpg,image/png"
        name={name}
        required={required}
        multiple={false}
        // value={value}
        onChange={(e) => onChangeHandler(e)}
      />
    </div>
  );
}
