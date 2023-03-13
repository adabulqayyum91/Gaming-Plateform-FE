import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

export default function DateField({
  placeholder,
  name,
  onchange,
  value,
  disabled,
}) {
  const onchangeHandler = (e) => {
    onchange({ target: { name: name, value: e } });
    onchange(name, e, false);
  };
  const today = new Date();
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack container spacing={3}>
          <DesktopDatePicker
            name={name}
            minDate={today}
            label={placeholder}
            value={value}
            disabled={disabled}
            onChange={onchangeHandler}
            renderInput={(params) => (
              <TextField
                autoComplete="off"
                sx={{
                  "& .MuiInputBase-root::after": {
                    border: "none",
                  },
                }}
                {...params}
                id="standard-basic"
                variant="standard"
              />
            )}
          />
        </Stack>
      </LocalizationProvider>
      <br />
    </>
  );
}
