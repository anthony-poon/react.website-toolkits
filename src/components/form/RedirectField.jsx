import { Box, MenuItem } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React from "react";

import { FormFieldWrapper } from "./FormFieldWrapper";

const DefaultLink = ({ to, children, className }) => {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
};

export const RedirectField = ({
  borderBottom = false,
  borderTop = false,
  title,
  subtitle,
  to = "#",
  component = DefaultLink,
}) => {
  return (
    <Box my={3}>
      <FormFieldWrapper gutter={false} borderBottom={borderBottom} borderTop={borderTop}>
        <MenuItem component={component} to={to}>
          <Box display={"flex"} flexGrow={1}>
            <Box py={1} flexGrow={1}>
              <Typography variant={"h6"}>{title}</Typography>
              <Typography variant={"caption"} color={"textSecondary"}>
                {subtitle}
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <ArrowForwardIosIcon color={"primary"} />
            </Box>
          </Box>
        </MenuItem>
      </FormFieldWrapper>
    </Box>
  );
};
