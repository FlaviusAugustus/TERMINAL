import { useEffect, useState } from "react";
import { DialogComp } from "./DialogComp";
import Loader from "./Loader";

const DialogLoader = () => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    showLoader && (
      <DialogComp
        className="p-4"
        isOpen={true}
        setIsOpen={() => {}}
        showTitle={false}
      >
        <Loader />
      </DialogComp>
    )
  );
};

export default DialogLoader;
