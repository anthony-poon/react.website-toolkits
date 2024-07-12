import { useEffect, useState } from "react";

export const useLoader = (init) => {
  const [isLoading, setLoading] = useState(init);
  useEffect(() => {
    if (isLoading) {
      document.body.style.cursor = "wait";
    } else {
      document.body.style.cursor = "default";
    }
    return () => {
      document.body.style.cursor = "default";
    };
  }, [isLoading]);
  return { isLoading, setLoading };
};
