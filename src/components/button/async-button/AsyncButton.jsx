import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

import { SpinnerButton } from "../spinner-button";

const AsyncButton = ({ onClick, onFinish, onError, duration, children, ...rest }) => {
  const [isLoading, setLoading] = useState(false);
  const [isUnhandledError, setIsUnhandledError] = useState(false);

  const mountRef = useRef(true);
  useEffect(() => {
    // On dismount
    return () => {
      mountRef.current = false;
    };
  }, []);

  const handleClick = async (evt) => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    try {
      const rtn = await Promise.all([
        onClick && onClick(evt),
        new Promise((resolve) => {
          setTimeout(resolve, duration);
        }),
      ]);
      onFinish && onFinish(rtn[0]);
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
    <SpinnerButton isLoading={isLoading} isError={isUnhandledError} onClick={handleClick} {...rest}>
      {children}
    </SpinnerButton>
  );
};

AsyncButton.defaultProps = {
  duration: 1500,
  type: "button",
  color: "primary",
  variant: "contained",
};

AsyncButton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(["default", "inherit", "primary", "secondary"]),
  duration: PropTypes.number,
  type: PropTypes.oneOf(["button", "submit"]),
  onClick: PropTypes.func,
  onFinish: PropTypes.func,
  onError: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  style: PropTypes.object,
};

export { AsyncButton };
