import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const RollsRoyceModels = ({ modelValue, filterCarsModel }) => {
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
          <MenuItem value="Dawn">Dawn</MenuItem>
          <MenuItem value="Phantom">Phantom</MenuItem>
         
        </Select>
      </FormControl>
    </div>
  );
};

export default RollsRoyceModels;
