import { Container, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import React from "react";

export const ResponsiveCard = ({ variant = "sm", children, customStyle }) => {
  const theme = useTheme();
  return (
    <Container maxWidth={variant} disableGutters>
      <Card
        style={{
          width: "100%",
          padding: theme.spacing(4),
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
