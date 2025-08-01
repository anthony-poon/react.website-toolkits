import { Container, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import React from "react";

// TODO: Remove the custom style
export const ResponsiveCard = ({ variant = "sm", children, customStyle = {} }) => {
  const theme = useTheme();
  return (
    <Container maxWidth={variant} disableGutters>
      <Card
        style={{
          width: "100%",
          padding: theme.spacing(2),
          border: "none",
          boxShadow: "none",
          ...customStyle,
        }}>
        {children}
      </Card>
    </Container>
  );
};

ResponsiveCard.propTypes = {
  variant: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
};
