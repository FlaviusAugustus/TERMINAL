import { useState, useEffect } from "react";

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const setOnline = () => setIsOnline(true);
    const setOffline = () => setIsOnline(false);

    window.addEventListener("online", setOnline, {
      signal: abortController.signal,
    });
    window.addEventListener("offline", setOffline, {
      signal: abortController.signal,
    });

    return () => {
      abortController.abort();
    };
  }, []);

  return isOnline;
};

export default useIsOnline;
