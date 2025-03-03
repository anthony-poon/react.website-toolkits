import { Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import React from "react";

import { LoadingIndicator } from "../components/LoadingIndicator";
import { UnhandledErrorIndicator } from "../components/UnhandledErrorIndicator";

export const SpinnerButton = ({
  type,
  variant,
  color,
  children,
  isDisabled,
  isError,
  isLoading,
  onClick,
  style,
  isIcon,
  ...rest
}) => {
  let indicator = isError ? <UnhandledErrorIndicator /> : isLoading ? <LoadingIndicator /> : null;
  const ButtonImpl = isIcon ? IconButton : Button;
  return (
    <ButtonImpl
      color={color}
      disabled={isDisabled || isError || isLoading}
      onClick={onClick}
      type={type}
      variant={variant}
      style={
        isDisabled || isError || isLoading
          ? {
              color: "grey",
              background: isLoading ? "white" : "#D3D3D3",
            }
          : style
      }
      {...rest}>
      {indicator}
      <Box
        style={{
          zIndex: 1,
        }}>
        {children}
      </Box>
    </ButtonImpl>
  );
};

SpinnerButton.defaultProps = {
  type: "button",
  color: "primary",
  variant: "contained",
};

SpinnerButton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(["success", "primary", "secondary", "error"]),
  type: PropTypes.oneOf(["button", "submit"]),
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  variant: PropTypes.oneOf(["contained", "outlined"]),
};
