import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DualLineLabel } from './DualLineLabel';
import { Box, Grid } from '@mui/material';
import { FormFieldWrapper } from './FormFieldWrapper';

export default function RowRadioButtonsGroup({ label, name, options, disabledOption, defaultValue,
  onChange, gutter = true, spacing = 4 }) {
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
                defaultValue={defaultValue}
                onChange={onChange}
                style={{ gap: `${spacing * 8}px` }}
              >
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
}
