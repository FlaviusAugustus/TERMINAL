import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface DialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description?: string;
  children: string | JSX.Element;
}

const DialogComp = (props: DialogProps) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogPanel className="modal-box">
        <DialogTitle className="font-bold">{props.title}</DialogTitle>
        <Description>{props.description}</Description>
        {/* CONTENT */}
        {props.children}
        <div className="modal-action">
          <Button className="btn" onClick={() => props.setIsOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default DialogComp;
