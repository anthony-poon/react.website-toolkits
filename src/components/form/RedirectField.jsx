import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

import { FormFieldWrapper } from "./FormFieldWrapper";

const DefaultLink = React.forwardRef(({ to, children, ...rest }, ref) => {
  return (
    <a href={to} ref={ref} {...rest}>
      {children}
    </a>
  );
});

DefaultLink.displayName = "DefaultLink";

export const RedirectField = ({
  borderBottom = false,
  borderTop = false,
  title,
  subtitle,
  to = "#",
  onClick,
  component = DefaultLink,
}) => {
  return (
    <Box my={3}>
      <FormFieldWrapper gutter={false} borderBottom={borderBottom} borderTop={borderTop}>
        <MenuItem component={component} to={to} onClick={onClick}>
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
