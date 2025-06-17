import { DialogComp } from "./DialogComp";
import Loader from "./Loader";

const DialogLoader = () => {
  return (
    <DialogComp
      className="p-4"
      isOpen={true}
      setIsOpen={() => {}}
      showTitle={false}
    >
      <Loader />
    </DialogComp>
  );
};

export default DialogLoader;
