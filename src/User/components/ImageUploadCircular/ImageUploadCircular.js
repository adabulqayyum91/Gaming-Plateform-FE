import { Grid } from "@mui/material";
import React, { useState } from "react";
import addIcon from "../../../assets/addIcon.svg";
import imgIcon from "../../../assets/Group 1589.svg";
import classes from "./ImageUploadCircular.module.scss";

export default function ImageUploadCircular({
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
        <Grid item className={classes.circularImageRoot}>
          {
            <img
              src={imgSrc ? imgSrc : imgIcon}
              className={classes.circularImgPreview}
            />
          }
          <div className={classes.circularImguploadIcon}>
            <label htmlFor="circular-image-upload">
              <img src={addIcon} height="20px" width="20px" />
            </label>
            <input
              style={{ display: "none" }}
              id="circular-image-upload"
              type="file"
              name={name}
              accept="image/*"
              // required={required}
              multiple={false}
              // value={value ? value : undefined}
              // multiple="true"
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
