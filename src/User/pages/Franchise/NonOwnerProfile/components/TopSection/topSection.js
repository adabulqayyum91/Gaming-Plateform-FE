import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Grid, Box, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router";

import { allWordsCapitalize } from "../../../../../../utils/apiutils";
import frenchBackImg from "../../../../../../assets/tourback.png";
import classes from "./topSection.module.scss";
import DynamicButton from "../../../../../components/dynamicButton/dynamicButton";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function TopSection({
  franchiseName,
  franchiseTitleImg,
  date,
  owner,
  userFranchMode,
  setTryoutOpen,
  tryout,
}) {
  const navigate = useNavigate();

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
      <IconButton onClick={() => navigate(-1)} className={classes.backChevron}>
        <ChevronLeftIcon sx={{ color: "#F26826", pb: "3px" }} />
      </IconButton>
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
        {userFranchMode === "simpleUser" &&
          (tryout == "" || tryout == "cancelled") && (
            <DynamicButton
              title="Tryout Request"
              clickHandler={() => setTryoutOpen(true)}
              pl="20px"
              pr="20px"
              pt="2px"
              pb="2px"
              color={true}
            />
          )}

        <p className={classes.ownerNameBox}>
          <span>Grand Prix Owner: </span>
          <span className={classes.ownerName}>{allWordsCapitalize(owner)}</span>
        </p>
      </Box>
    </Grid>
  );
}
