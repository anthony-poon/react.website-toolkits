import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";

import { ResponsiveTextField } from "./ResponsiveTextField";

const Adornment = ({ isHidden, onToggle }) => {
  return (
    <InputAdornment position="end">
      <IconButton aria-label="toggle password visibility" onClick={onToggle} edge="end">
        {isHidden ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};

export const ResponsivePasswordField = (props) => {
  const [isHidden, setHidden] = useState(true);
  return (
    <ResponsiveTextField
      {...props}
      type={isHidden ? "password" : "text"}
      InputProps={{ endAdornment: <Adornment isHidden={isHidden} onToggle={() => setHidden(!isHidden)} /> }}
    />
  );
};
