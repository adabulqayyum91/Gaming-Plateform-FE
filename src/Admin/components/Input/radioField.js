import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { allWordsCapitalize } from "../../../utils/apiutils";

export default function RadioField({
  name,
  onchange,
  value,
  options,
  required,
}) {
  const handleChange = (e) => {
    let val = e.target.value;
    onchange(name, val);
  };
  return (
    <>
      <FormControl>
        <RadioGroup
          required
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name={name}
          onChange={handleChange}
          value={value}
        >
          {options.map((x, i) => (
            <FormControlLabel
              key={i}
              value={x}
              control={<Radio />}
              label={allWordsCapitalize(x)}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <br />
    </>
  );
}
