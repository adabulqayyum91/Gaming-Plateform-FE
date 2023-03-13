import { Grid } from "@mui/material";
import React, { useState } from "react";
import addIcon from "../../../assets/addIcon.svg";
import dummyIcon from "../../../assets/addLeagueIcon.svg";

export default function imageUpload({
  name,
  required,
  value,
  onchange,
  disabled,
  setFieldTouched,
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
      <Grid container>
        <Grid
          item
          sx={{
            width: "100%",
            height: "200px",
            border: "1px solid #707070",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          {imgSrc ? (
            <img src={imgSrc} height="100%" width="100%" />
          ) : (
            <img src={dummyIcon} height="190px" width="120px" />
          )}
          <div style={{ position: "absolute", left: "47%", bottom: "-10px" }}>
            <label htmlFor="tournament-image-upload">
              <img src={addIcon} height="30px" width="30px" />
            </label>
            <input
              onBlur={() => setFieldTouched(name)}
              style={{ display: "none" }}
              id="tournament-image-upload"
              type="file"
              name={name}
              accept="image/*"
              disabled={disabled}
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
