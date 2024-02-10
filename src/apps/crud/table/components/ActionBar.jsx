import { Box, Button } from "@mui/material";
import React from "react";

export const ActionButton = (props) => {
  const { width, component = Button, ...rest } = props;

  const button = React.createElement(component, {
    fullWidth: true,
    size: "small",
    color: "primary",
    variant: "outlined",
    ...rest,
  });
  return (
    <Box mr={1} width={width}>
      {button}
    </Box>
  );
};

export const ActionBar = ({ options, onClick }) => {
  return (
    <Box pb={2} display={"flex"} justifyContent={"flex-end"}>
      {options.map((option) => {
        const { value, icon, display, ...rest } = option;
        return (
          <ActionButton key={value} onClick={() => onClick(value)} startIcon={icon} {...rest}>
            {display}
          </ActionButton>
        );
      })}
    </Box>
  );
};
