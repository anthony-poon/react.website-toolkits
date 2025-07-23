import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { SpinnerDiv } from "./SpinnerDiv";

interface AsyncDivProps {
  onMount?: () => Promise<unknown> | (() => unknown);
  onError?: (error: unknown) => void;
  children?: React.ReactNode;
  duration?: number;
  fullscreen?: boolean;
}

type AsyncDivHandle = {
  reload: () => void;
};

// eslint-disable-next-line react/display-name
export const AsyncDiv = forwardRef<AsyncDivHandle, AsyncDivProps>((props, ref) => {
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    setIsLoading(true);
    await props.onMount();
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => await load())();
  }, []);

  useImperativeHandle(ref, () => ({
    reload: load,
  }));

  return <SpinnerDiv isLoading={isLoading}>{props.children}</SpinnerDiv>;
});
