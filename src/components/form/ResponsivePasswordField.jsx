import { FormControl, FormHelperText, Grid, Input, InputAdornment } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

import { DualLineLabel } from "./DualLineLabel";
import { FormFieldWrapper } from "./FormFieldWrapper";

export const ResponsivePasswordField = ({ error, label, subLabel, value, name, required, onChange, ...rest }) => {
  const [isHidden, setHidden] = useState(true);
  const isError = Boolean(error);
  const handleChange = (evt) => {
    onChange(name, evt.target.value);
  };

  const adornment = (
    <InputAdornment position="end">
      <IconButton aria-label="toggle password visibility" onClick={() => setHidden(!isHidden)} edge="end">
        {isHidden ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
  return (
    <FormFieldWrapper>
      <Box display={"flex"}>
        <Hidden mdUp implementation={"js"}>
          <Grid container>
            <Grid item xs>
              <Box mt={3} mb={1}>
                <FormControl
                  error={isError}
                  style={{
                    width: "100%",
                  }}>
                  <Input
                    fullWidth
                    type={isHidden ? "password" : "text"}
                    error={isError}
                    label={label}
                    value={value === undefined || value === null ? "" : value}
                    name={name}
                    onChange={handleChange}
                    endAdornment={adornment}
                    {...rest}
                  />
                  {isError && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Hidden>
        <Hidden smDown implementation={"js"}>
          <Grid container>
            <Grid item xs={3}>
              <Box pr={2} pt={2}>
                <Box display={"flex"}>
                  <DualLineLabel title={label} subtitle={subLabel} required={required} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs>
              <Box mt={3} mb={1}>
                <FormControl
                  error={isError}
                  style={{
                    width: "100%",
                  }}>
                  <Input
                    error={isError}
                    type={isHidden ? "password" : "text"}
                    fullWidth
                    value={value === undefined || value === null ? "" : value}
                    name={name}
                    onChange={handleChange}
                    endAdornment={adornment}
                    {...rest}
                  />
                  {isError && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Hidden>
      </Box>
    </FormFieldWrapper>
  );
};
