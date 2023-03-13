import React, { useState } from "react";
import ProfileBgImg from "../../../assets/Group 1416.svg";
import "./imageUpload.css";

export default function imageUpload({
  name,
  required,
  value,
  imgType,
  imgUploadHanlder,
}) {
  const onChangeHandler = (e) => {
    var file = e.target.files[0];
    const formData = new FormData();
    formData.append(imgType, file);
    imgUploadHanlder(formData);
  };

  return (
    <>
      <label htmlFor={`profileImg${imgType}`} id="userprofile-img-upload">
        <img src={ProfileBgImg} alt="" style={{ cursor: "pointer" }} />
      </label>
      <input
        style={{ display: "none" }}
        id={`profileImg${imgType}`}
        type="file"
        accept="image/*"
        name={name}
        required={required}
        multiple={false}
        value={value}
        multiple="true"
        onChange={(e) => onChangeHandler(e)}
      />
    </>
  );
}
