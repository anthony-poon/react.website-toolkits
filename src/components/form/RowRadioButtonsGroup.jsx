import { Box, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import * as React from "react";

import { DualLineLabel } from "./DualLineLabel";
import { FormFieldWrapper } from "./FormFieldWrapper";

export const RowRadioButtonsGroup = ({
  label,
  name,
  options,
  disabledOption,
  value,
  onChange,
  gutter = true,
  spacing = 4,
}) => {
  const handleChange = (evt) => {
    onChange(name, evt.target.value);
  };

  return (
    <FormFieldWrapper gutter={gutter}>
      <Grid container>
        <Grid item xs={3}>
          <Box pr={2} pt={2}>
            <Box display={"flex"}>
              <DualLineLabel title={label} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box mt={2} mb={1}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby={`${name}-label`}
                name={name}
                value={value}
                onChange={handleChange}
                style={{ gap: `${spacing * 8}px` }}>
                {options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                    disabled={disabledOption === option.value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </FormFieldWrapper>
  );
};
