import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import apiClient from "@api/apiClient";

async function pingBackend(): Promise<number | undefined> {
  const result = await apiClient.get<string>("ping", {
    validateStatus: () => true,
  });
  return result.status;
}

const OnlineStatusContext = createContext(true);

export const OnlineStatusProvider = ({ children }: PropsWithChildren) => {
  const delayBackoff = 3000;

  const [isOnline, setIsOnline] = useState(true);
  const [pingDelay, setPingDelay] = useState(delayBackoff);

  useEffect(() => {
    setPingDelay((currentDelay) =>
      isOnline ? delayBackoff : currentDelay + delayBackoff
    );
  }, [isOnline]);

  useEffect(() => {
    const abortController = new AbortController();

    const setOnline = () => setIsOnline(true);
    const setOffline = () => setIsOnline(false);

    const id = setInterval(async () => {
      try {
        const status = await pingBackend();
        setIsOnline(status === 200);
      } catch {
        setIsOnline(false);
      }
    }, pingDelay);

    window.addEventListener("online", setOnline, {
      signal: abortController.signal,
    });
    window.addEventListener("offline", setOffline, {
      signal: abortController.signal,
    });

    return () => {
      abortController.abort();
      clearInterval(id);
    };
  }, [pingDelay]);

  return (
    <OnlineStatusContext.Provider value={isOnline}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

const useIsOnline = (): boolean => {
  return useContext(OnlineStatusContext);
};

export default useIsOnline;
