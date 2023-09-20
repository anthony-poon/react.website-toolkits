import { MenuItem } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import _ from "lodash";
import React from "react";

const useStyle = makeStyles((theme) => ({
  sortBarContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  dropdownContainer: {
    width: 120,
  },
}));

export const SortBar = ({ options = [], value, isAsc = false, onChange }) => {
  const classes = useStyle();
  const handleSortByChange = (evt) => {
    onChange({
      value: evt.target.value,
      isAsc: isAsc,
    });
  };
  const handleAscChange = (evt) => {
    onChange({
      value: value,
      isAsc: !isAsc,
    });
  };
  const dropdown = _.isObject(options[0])
    ? options
    : _.map(options, (option) => ({
        display: option,
        value: option,
      }));
  return (
    <div className={classes.sortBarContainer}>
      <Typography variant={"subtitle2"}>Sort By</Typography>
      <Box mx={1} className={classes.dropdownContainer}>
        <FormControl variant={"standard"} fullWidth>
          <Select value={value} onChange={handleSortByChange}>
            {dropdown.map((d) => (
              <MenuItem key={d.value} value={d.value}>
                <Typography variant={"subtitle2"}>{d.display}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <IconButton variant={"text"} size={"small"} onClick={handleAscChange}>
        {isAsc ? <ArrowUpward fontSize={"small"} /> : <ArrowDownward fontSize={"small"} />}
      </IconButton>
    </div>
  );
};
