import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setErrorMsg } from "../redux";

export const makeAsyncFetch = (onFetch, onError) => {
  return (...args) => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    const [payload, setPayload] = useState(null);
    const [isError, setError] = useState(false);
    const refresh = async () => {
      try {
        setLoading(true);
        setError(false);
        const payload = await onFetch(...args);
        setPayload(payload);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
        if (onError) {
          onError(e);
        } else {
          dispatch(setErrorMsg(e));
        }
      }
    };
    useEffect(() => {
      (async () => await refresh())();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...args]);
    return { payload, isLoading, isError, refresh };
  };
};
