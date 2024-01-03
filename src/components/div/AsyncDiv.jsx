import React, { useEffect, useRef, useState } from "react";

import { SpinnerDiv } from "./SpinnerDiv";

/**
 * @deprecated This component is limiting. I am contemplating of using SpinnerDiv directly instead of this as a wrapper class
 */
export const AsyncDiv = ({ onMount, children, duration = 1500, implementation = "js" }) => {
  const [isLoading, setLoading] = useState(true);
  const [isError] = useState(false);
  const mountRef = useRef(true);
  useEffect(() => {
    (async () => {
      await Promise.all([
        onMount && onMount(),
        new Promise((resolve) => {
          setTimeout(resolve, duration);
        }),
      ]);
      if (mountRef.current) {
        setLoading(false);
      }
    })();
    return () => {
      mountRef.current = false;
    };
    // Duration are not meant to be changed after mount, nor does onMount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // TODO: Error indicator
  return (
    <>
      {
        <SpinnerDiv implementation={implementation} isLoading={isLoading} isError={isError}>
          {children}
        </SpinnerDiv>
      }
    </>
  );
};
