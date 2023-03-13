import { Grid, Box, Typography } from "@mui/material";

import { allWordsCapitalize } from "../../../../../../utils/apiutils";
import frenchBackImg from "../../../../../../assets/tourback.png";
import classes from "./topSection.module.scss";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function TopSection({
  franchiseName,
  franchiseTitleImg,
  date,
  owner,
}) {
  const BackImg = franchiseTitleImg
    ? BASE_URL + franchiseTitleImg
    : frenchBackImg;
  return (
    <Grid
      item
      md={12}
      className={classes.topSection}
      style={{
        backgroundImage: `url('${BackImg}')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box className={classes.franchiseName}>
        <Typography
          component="span"
          sx={{ fontSize: "30px", fontWeight: "bold", marginLeft: "10%" }}
        >
          {franchiseName?.toUpperCase()}
        </Typography>
        <Typography
          component="span"
          sx={{ fontSize: "14px", fontWeight: "bold", marginLeft: "10%" }}
        >
          Since: {date}
        </Typography>
      </Box>
      <Box component="span" className={classes.ownerNameOuter}>
        <span>Grand Prix Owner: </span>
        <span className={classes.ownerName}>{allWordsCapitalize(owner)}</span>
      </Box>
    </Grid>
  );
}
