import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const DoubleStandart = ({ sizeValue, filterRoomsRoomSize }) => {
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={sizeValue}
          onChange={(e) => {
            filterRoomsRoomSize("size", e.target.value);
          }}
          label="Size"
        >
          <MenuItem value="">
            <em>Выберите кол комнат</em>
          </MenuItem>
          <MenuItem value="one">one</MenuItem>
          <MenuItem value="two">two</MenuItem>
          <MenuItem value="three">three</MenuItem>
          {/* <MenuItem value="S-Class">S-Class</MenuItem> */}
          {/* <MenuItem value="G-Class">G-Class</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
};

export default DoubleStandart;
