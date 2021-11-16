import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

const ToyotaModels = ({ brandValue, filterCars }) => {
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
        <FormControlLabel value="camry" control={<Radio />} label="Camry" />
        <FormControlLabel value="prius" control={<Radio />} label="Prius" />
      </RadioGroup>
    </FormControl>
  );
};

export default ToyotaModels;