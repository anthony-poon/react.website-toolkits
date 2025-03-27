import React, { useEffect, useRef, useState } from "react";
import { SpinnerButton } from "../spinner-button";

type ButtonVariant = "contained" | "outlined";
type ButtonColor = "primary" | "secondary" | "error" | "success";
type ButtonType = "button" | "submit";

interface AsyncButtonProps {
  type?: ButtonType;
  variant?: ButtonVariant;
  color?: ButtonColor;
  style?: React.CSSProperties; // TODO: Remove style props
  title?: string;
  isIcon?: boolean;
  children?: React.ReactNode;
  onClick?: () => unknown | Promise<unknown>;
  onError?: (error: unknown) => void;
  duration?: number;
  fullWidth?: boolean;
}

export const AsyncButton: React.FC<AsyncButtonProps> = ({
                                                          type = "button",
                                                          variant = "contained",
                                                          color = "primary",
                                                          style,
                                                          title,
                                                          isIcon,
                                                          children,
                                                          onClick,
                                                          onError,
                                                          duration = 1500,
                                                          fullWidth = false,
                                                        }) => {
  const [isLoading, setLoading] = useState(false);
  const [isUnhandledError, setIsUnhandledError] = useState(false);
  const mountRef = useRef(true);

  useEffect(() => {
    return () => {
      mountRef.current = false;
    };
  }, []);

  const handleClick = async () => {
    if (isLoading) return;

    setLoading(true);

    try {
      await Promise.all([
        onClick?.() ?? Promise.resolve(),
        new Promise((resolve) => setTimeout(resolve, duration)),
      ]);

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
      onClick={handleClick}
    >
      {children}
    </SpinnerButton>
  );
};