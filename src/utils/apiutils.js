import moment from "moment";
import { Tooltip } from "@mui/material";
import { capitalize } from "./apisauce";

const stringCheck = (input) => {
  return input !== null &&
    input !== "" &&
    input !== undefined &&
    typeof input === "string"
    ? true
    : false;
};

const isDatePassed = (date) => {
  let str = date;
  const isDatePassed = moment(str).isBefore(moment());
  return isDatePassed;
};
const dateTimeFormate = (stringIso) => {
  let str = stringIso;
  let date = moment(str);
  let dateComponent = date.format("YYYY-MM-DD, hh:mm A");
  return dateComponent;
};
const dateFormate = (stringIso) => {
  let str = stringIso;
  let date = moment(str);
  let dateComponent = date.format("MMM DD, YYYY");
  return dateComponent;
};
const timeFormate = (stringIso) => {
  let str = stringIso;
  let date = moment(str);
  let timeComp = date.format("hh:mm A");
  return timeComp;
};
const idToName = (arr, id, key) => {
  if (arr?.length > 0) {
    let obj = arr.filter((item) => item._id == id)[0];
    let out = obj[key];
    return out;
  }
  return true;
};
const lowerSpaceJoinStr = (input) => {
  if (
    input !== null &&
    input !== "" &&
    input !== undefined &&
    typeof input === "string"
  ) {
    let out = input.toLocaleLowerCase().replace(/\s\s+/g, " ");
    return out.split(" ").join("");
  }
  return input;
};
const allWordsCapitalize = (input) => {
  if (
    input !== null &&
    input !== "" &&
    input !== undefined &&
    typeof input === "string"
  ) {
    input = input.trim().replace(/\s\s+/g, " ");
    var words = input?.split(" ");
    var CapitalizedWords = [];
    words.forEach((element) => {
      CapitalizedWords.push(
        element[0]?.toUpperCase() + element?.slice(1, element?.length)
      );
    });
    return CapitalizedWords?.join(" ");
  }
  input = "";
  return input;
};
const trimString = (input, len) => {
  if (stringCheck(input)) {
    input = capitalize(input).replace(/\s\s+/g, " ");
    return input.length > len ? input.substring(0, len) + "..." : input;
  }
  input = "";
  return input;
};
const tooltipTrim = (input, len) => {
  if (stringCheck(input)) {
    input = allWordsCapitalize(input);
    return input.length > len ? (
      <Tooltip title={input} placement="top">
        <span>{input.substring(0, len) + "..."}</span>
      </Tooltip>
    ) : (
      input
    );
  }
  return input;
};
const tooltipNumber = (input, len) => {
  input = input + "";
  return input.length > len ? (
    <Tooltip title={input} placement="top">
      <span>{input.substring(0, len) + "..."}</span>
    </Tooltip>
  ) : (
    input
  );
};
const getExtension = (filename) => {
  var parts = filename.split(".");
  return parts[parts.length - 1];
};

const isImage = (filename) => {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case "jpg":
    case "jpeg":
    case "gif":
    case "bmp":
    case "png":
      //etc
      return true;
  }
  return false;
};

const isVideo = (filename) => {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case "m4v":
    case "avi":
    case "mpg":
    case "mp4":
      // etc
      return true;
  }
  return false;
};
const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
const lowerDashJoinStr = (input) => {
  if (
    input !== null &&
    input !== "" &&
    input !== undefined &&
    typeof input === "string"
  ) {
    let out = input.toLocaleLowerCase();
    return out.split(" ").join("-");
  }
  return input;
};
const getDifferenceInSeconds = (date1, date2) => {
  const diffInMs = date1 > date2;
  return diffInMs;
};

export {
  dateTimeFormate,
  dateFormate,
  timeFormate,
  idToName,
  lowerSpaceJoinStr,
  allWordsCapitalize,
  trimString,
  tooltipTrim,
  isImage,
  isVideo,
  tooltipNumber,
  parseJwt,
  lowerDashJoinStr,
  getDifferenceInSeconds,
  isDatePassed,
};
