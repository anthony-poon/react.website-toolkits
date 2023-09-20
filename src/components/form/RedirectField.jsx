import { Box, MenuItem } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React from "react";

import { FormFieldWrapper } from "./FormFieldWrapper";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  }
}));

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
  component = DefaultLink
}) => {
  const classes = useStyle();
  return (
    <Box my={3}>
      <FormFieldWrapper gutter={false} borderBottom={borderBottom} borderTop={borderTop}>
        <MenuItem className={classes.container} component={component} to={to}>
          <Box py={1}>
            <Typography variant={"h6"}>{title}</Typography>
            <Typography variant={"caption"} color={"textSecondary"}>
              {subtitle}
            </Typography>
          </Box>
          <ArrowForwardIosIcon color={"primary"} />
        </MenuItem>
      </FormFieldWrapper>
    </Box>
  );
};
