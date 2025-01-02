import { Box, Button } from "@mui/material";
import React from "react";

export const ActionButton = (props) => {
  const { isDisabled, width, component = Button, ...rest } = props;

  const button = React.createElement(component, {
    fullWidth: true,
    size: "small",
    color: "primary",
    variant: "outlined",
    disabled: isDisabled,
    ...rest,
  });
  return (
    <Box mr={1} width={width}>
      {button}
    </Box>
  );
};

export const ActionBar = ({ options }) => {
  return (
    <Box pb={2} display={"flex"} justifyContent={"flex-end"}>
      {options.map((option) => {
        const { icon, display, onClick, color, isDisabled } = option;
        return (
          <ActionButton key={display} onClick={() => onClick()} startIcon={icon} color={color} isDisabled={isDisabled}>
            {display}
          </ActionButton>
        );
      })}
    </Box>
  );
};
