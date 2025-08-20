import React, { useEffect, useRef, useState } from "react";

import { SpinnerButton } from "../spinner-button";

type ButtonVariant = "contained" | "outlined";
type ButtonColor = "primary" | "secondary" | "error" | "success";
type ButtonType = "button" | "submit";

interface AsyncButtonProps {
  type?: ButtonType;
  variant?: ButtonVariant;
  greyVariant?: boolean;
  color?: ButtonColor;
  style?: React.CSSProperties; // TODO: Remove style props
  title?: string;
  isIcon?: boolean;
  children?: React.ReactNode;
  onClick?: () => unknown | Promise<unknown>;
  onError?: (error: unknown) => void;
  duration?: number;
  fullWidth?: boolean;
  isDisabled?: boolean;
}

const resolveStyle = (props: AsyncButtonProps) => {
  if (props.greyVariant) {
    return {
      backgroundColor: "#f8f8f8ff",
      color: "#212121",
      "&:hover": {
        backgroundColor: "#b8b8b8ff",
      },
      ...props.style,
    };
  }
  return props.style;
};

export const AsyncButton: React.FC<AsyncButtonProps> = (props: AsyncButtonProps) => {
  const {
    type = "button",
    variant = "contained",
    color = "primary",
    title,
    isIcon,
    children,
    onClick,
    onError,
    duration = 1500,
    fullWidth = false,
    isDisabled,
  } = props;
  const [isLoading, setLoading] = useState(false);
  const [isUnhandledError, setIsUnhandledError] = useState(false);
  const mountRef = useRef(true);
  const style = resolveStyle(props);

  useEffect(() => {
    return () => {
      mountRef.current = false;
    };
  }, []);

  const handleClick = async () => {
    if (isLoading) return;

    setLoading(true);

    try {
      await Promise.all([onClick?.() ?? Promise.resolve(), new Promise((resolve) => setTimeout(resolve, duration))]);

      if (mountRef.current) {
        setLoading(false);
      }
    } catch (e) {
      if (onError) {
        onError(e);
      } else {
        console.error(e);
        if (mountRef.current) {
          setIsUnhandledError(true);
        }
      }
    }
  };

  return (
    <SpinnerButton
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      color={color}
      style={style}
      title={title}
      isIcon={isIcon}
      isLoading={isLoading}
      isError={isUnhandledError}
      isDisabled={isDisabled}
      onClick={handleClick}>
      {children}
    </SpinnerButton>
  );
};
