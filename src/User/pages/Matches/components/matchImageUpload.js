import { Grid } from "@mui/material";
import React, { useState } from "react";
import ImgUploadIcon from "../../../../assets/Group 1416.svg";
import classes from "./matchImageUpload.module.scss";

export default function ImageUploadmatch({ name, required, value, onchange }) {
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
        <Grid item className={classes.matchImageRoot}>
          {imgSrc && <img src={imgSrc} className={classes.matchImgPreview} />}
          <div className={classes.matchImguploadIcon}>
            <label
              htmlFor="match-image-upload"
              className={classes.matchImageUpload}
            >
              <img style={{ cursor: "pointer" }} src={ImgUploadIcon} />
            </label>
            <input
              style={{ display: "none" }}
              id="match-image-upload"
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
