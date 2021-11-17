import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const LamborghiniModels = ({ modelValue, filterCarsModel }) => {
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
          <MenuItem value="Veneno Roadster – 1 of 9">Veneno Roadster – 1 of 9</MenuItem>
          <MenuItem value="Sián FKP 37">Sián FKP 37</MenuItem>
          <MenuItem value="V12 Vision FKP 37">V12 Vision FKP 37</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default LamborghiniModels;
