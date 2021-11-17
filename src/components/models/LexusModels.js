import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const LexusModels = ({ modelValue, filterCarsModel }) => {
  
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Model</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={modelValue}
          onChange={(e) => {
            filterCarsModel("model", e.target.value);
          }}
          label="Model"
        >
          <MenuItem value="">
            <em>Выберите бренд</em>
          </MenuItem>
          <MenuItem value="RC200t">RC200t</MenuItem>
          <MenuItem value="LX570">LX570</MenuItem>
          <MenuItem value="GS250">GS250</MenuItem>
          <MenuItem value="RX270">RX270</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default LexusModels;
