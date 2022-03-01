import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";

export const SearchBar = ({ value, onChange }) => {
    const handleChange = (evt) => {
        onChange(evt.target.value);
    }
    return (
        <TextField
            fullWidth
            value={value}
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search fontSize={"small"}/>
                    </InputAdornment>
                )
            }}
        />
    )
}