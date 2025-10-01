import { clsx } from "clsx";
import TerminalBanner from "./TerminalBanner.tsx";

type FullScreenLoaderProps = {
  visible: boolean;
};

const FullScreenLoader = ({ visible }: FullScreenLoaderProps) => {
  return (
    <div
      className={clsx(
        "absolute top-0 left-0 z-50 h-screen w-screen flex items-center justify-center animate-fadeIn transition-opacity duration-1000 opacity-0 bg-white pointer-events-none",
        visible && "opacity-100"
      )}
    >
      <div className="flex flex-col gap-2">
        <TerminalBanner />
        <progress className="progress w-full" />
      </div>
    </div>
  );
};

export default FullScreenLoader;
