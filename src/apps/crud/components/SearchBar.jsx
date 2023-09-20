import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import React from "react";

export const SearchBar = ({ value, onChange }) => {
  const handleChange = (evt) => {
    onChange(evt.target.value);
  };
  return (
    <TextField
      fullWidth
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
