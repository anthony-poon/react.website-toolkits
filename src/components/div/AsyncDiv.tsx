import React, { useEffect, useRef, useState } from "react";

import { SpinnerDiv } from "./SpinnerDiv";

interface AsyncDivProps {
  onMount?: () => Promise<unknown>;
  onError?: (error: unknown) => void;
  children?: React.ReactNode;
  duration?: number;
}

export const AsyncDiv: React.FC<AsyncDivProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const mountRef = useRef(false);

  useEffect(() => {
    mountRef.current = true;

    (async () => {
      try {
        await Promise.all([
          props.onMount?.()  ?? Promise.resolve(),
          new Promise((resolve) => setTimeout(resolve, props.duration || 1500)),
        ]);
        if (mountRef.current) {
          setIsLoading(false);
        }
      } catch (error) {
        if (mountRef.current) {
          setIsError(true);
        }
        props.onError?.(error);
      }
    })();

    return () => {
      mountRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SpinnerDiv
      isLoading={isLoading}
      isError={isError}
    >
      {props.children}
    </SpinnerDiv>
  );
};