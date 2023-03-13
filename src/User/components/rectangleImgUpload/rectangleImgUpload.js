import { Grid } from "@mui/material";
import React, { useState } from "react";
import ImgUploadIcon from "../../../assets/Group 1416.svg";
import dummyIcon from "../../../assets/uploadPhotoIcon.svg";
import classes from "./rectangleImgUpload.module.scss";

export default function RectangleImgUpload({
  name,
  required,
  value,
  onchange,
}) {
  const [imgSrc, setImgSrc] = useState(value);

  const onChangeHandler = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setImgSrc([reader.result]);
    };
    onchange(name, file);
  };

  return (
    <>
      <Grid container sx={{ justifyContent: "center", my: 2 }}>
        <Grid item className={classes.rectangleImageRoot}>
          {
            <img
              src={imgSrc ? imgSrc : dummyIcon}
              className={classes.rectangleImgPreview}
            />
          }
          <div className={classes.rectangleImguploadIcon}>
            <label
              htmlFor={`${name}-image-upload`}
              className={classes.rectangleImageUpload}
            >
              <img style={{ cursor: "pointer" }} src={ImgUploadIcon} />
            </label>
            <input
              style={{ display: "none" }}
              id={`${name}-image-upload`}
              type="file"
              name={name}
              accept="image/*"
              required={required}
              multiple={false}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
