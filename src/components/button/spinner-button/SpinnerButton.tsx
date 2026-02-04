import React from "react";
import { Box, Button, IconButton } from "@mui/material";

import { LoadingIndicator } from "../components/LoadingIndicator";
import { UnhandledErrorIndicator } from "../components/UnhandledErrorIndicator";

type SpinnerButtonProps = {
  type?: "button" | "submit";
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary" | "error" | "success";
  children?: React.ReactNode;
  isDisabled?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties; // TODO: Remove style props
  isIcon?: boolean;
  title?: string;
  fullWidth?: boolean;
};

export const SpinnerButton: React.FC<SpinnerButtonProps> = (props) => {
  const {
    type = "button",
    variant = "contained",
    color = "primary",
    children,
    isDisabled,
    isError,
    isLoading,
    onClick,
    style,
    isIcon,
    title,
    fullWidth = false,
  } = props;
  const indicator = isError ? (
    <UnhandledErrorIndicator />
  ) : isLoading ? (
    <LoadingIndicator />
  ) : null;

  return isIcon ? (
    <IconButton
      color={color}
      onClick={onClick}
      title={title}
      disabled={isDisabled || isError || isLoading}
      style={{
        ...(style || {}),
        ...(isDisabled || isError || isLoading
          ? { color: "grey", background: isLoading ? "white" : "#D3D3D3" }
          : {}),
      }}
    >
      {indicator}
      <Box style={{ zIndex: 1 }}>{children}</Box>
    </IconButton>
  ) : (
    <Button
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      title={title}
      disabled={isDisabled || isError || isLoading}
      style={{
        ...(style || {}),
        ...(isDisabled || isError || isLoading
          ? { color: "grey", background: isLoading ? "white" : "#D3D3D3" }
          : {}),
      }}
    >
      {indicator}
      <Box style={{ zIndex: 1 }}>{children}</Box>
    </Button>
  );
};