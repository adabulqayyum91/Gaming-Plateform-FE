import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default function dateField({
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
          <DateTimePicker
            name={name}
            minDateTime={today}
            label={placeholder}
            value={value}
            onChange={onchangeHandler}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  "& .MuiInputBase-root::after": {
                    border: "none",
                  },
                }}
                autoComplete="off"
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
