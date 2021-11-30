import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const EthnoBasic = ({ sizeValue, filterRoomsRoomSize }) => {
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
          {/* <MenuItem value="WRX S4">WRX S4</MenuItem> */}
          {/* <MenuItem value="BRZ">BRZ</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
};

export default EthnoBasic;
