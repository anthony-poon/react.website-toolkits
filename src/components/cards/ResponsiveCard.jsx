import { Container, useTheme } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import React from "react";

export const ResponsiveCard = ({ variant = "sm", children }) => {
  const theme = useTheme();
  return (
    <Container maxWidth={variant} disableGutters>
      <Card
        style={{
          width: "100%",
          padding: theme.spacing(4),
        }}>
        {children}
      </Card>
    </Container>
  );
};

ResponsiveCard.propTypes = {
  variant: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
};
