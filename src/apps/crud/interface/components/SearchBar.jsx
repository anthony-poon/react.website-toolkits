import Search from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";

export const SearchBar = ({ value, onChange }) => {
  const handleChange = (evt) => {
    onChange(evt.target.value);
  };
  return (
    <TextField
      fullWidth
      variant={"standard"}
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search fontSize={"small"} />
          </InputAdornment>
        ),
      }}
    />
  );
};
