import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

const LexusModels = ({ brandValue, filterCars }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Model</FormLabel>
      <RadioGroup
        aria-label="gender"
        value={brandValue}
        name="radio-buttons-group"
        onChange={(e) => {
          filterCars("model", e.target.value);
        }}
      >
        <FormControlLabel value="lx570" control={<Radio />} label="LX 570" />
        <FormControlLabel value="gx460" control={<Radio />} label="GX 460" />
      </RadioGroup>
    </FormControl>
  );
};

export default LexusModels;
