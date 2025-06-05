import { useEffect, useRef } from "react";

type UseLongPollOptions = {
  interval?: number;
};

export const useLongPoll = (fn: () => Promise<unknown>, option?: UseLongPollOptions) => {
  const fnRef = useRef(fn);
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    let canceled = false;
    let timeout: ReturnType<typeof setTimeout>;
    const poll = async () => {
      try {
        if (canceled) return;
        await fnRef.current();
        timeout = setTimeout(poll, option?.interval || 5000);
      } catch (e) {
        canceled = true;
      }
    };
    poll();
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
