import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import React from "react";

export const ActionButton = ({ component = Button, ...rest }) => {
  const button = React.createElement(component, {
    fullWidth: true,
    size: "small",
    variant: "outlined",
    color: "primary",
    ...rest,
  });
  return <Box mb={1}>{button}</Box>;
};

export const Toolbar = ({ component = Button, options, onClick }) => {
  if (_.isEmpty(options)) {
    return null;
  }
  return (
    <Box ml={3}>
      {options.map((option) => {
        const { value, icon, display, ...rest } = option;
        return (
          <ActionButton key={value} onClick={() => onClick(value)} startIcon={icon} component={component} {...rest}>
            {display}
          </ActionButton>
        );
      })}
    </Box>
  );
};
