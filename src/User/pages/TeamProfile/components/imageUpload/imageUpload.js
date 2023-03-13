import React, { useState } from "react";
import ProfileBgImg from "../../../../../assets/Group 1416.svg";
import "./imageUpload.module.scss";

export default function ImgUploadWitId({
  name,
  required,
  value,
  imgType,
  imgUploadHanlder,
  id,
}) {
  const onChangeHandler = (e) => {
    var file = e.target.files[0];
    const formData = new FormData();
    formData.append(imgType, file);
    formData.append("teamId", id);
    imgUploadHanlder(formData);
  };

  return (
    <>
      <label htmlFor={`profileImg${imgType}`} id="userprofile-img-upload">
        <img src={ProfileBgImg} alt="" />
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
