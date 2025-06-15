import { ReactNode } from "react";

type ComponentOrLoaderProps = {
  isLoading: boolean;
  loader: ReactNode;
  children: ReactNode;
};
const ComponentOrLoader = ({
  isLoading,
  loader,
  children,
}: ComponentOrLoaderProps) => {
  return isLoading ? loader : children;
};

export default ComponentOrLoader;
