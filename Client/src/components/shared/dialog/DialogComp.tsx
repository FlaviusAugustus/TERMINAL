import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { ReactNode } from "react";
import { DialogButton } from "@components/shared/dialog/DialogButton.tsx";

export type DialogProps = {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  title?: string;
  description?: string;
  children?: ReactNode | ReactNode[];
  showTitle?: boolean;
  hasDynamicHeight?: boolean;
};

/**
 * DialogComp Component
 *
 * A reusable dialog component that displays a modal with a title, content, and a close button.
 *
 * @component
 */
const DialogComp = ({
  className,
  isOpen,
  setIsOpen,
  handleClose,
  title,
  children,
  showTitle = true,
  hasDynamicHeight = false,
}: DialogProps) => {
  const closeDialog = handleClose ?? (() => setIsOpen(false));

  return (
    <Dialog
      open={isOpen}
      onClose={() => closeDialog()}
      transition
      className={clsx(
        "fixed inset-0 flex w-screen backdrop-blur-sm justify-center bg-black/30 p-4 transition duration-100 ease-out data-[closed]:opacity-0 z-50",
        hasDynamicHeight ? "items-start md:pt-20" : "items-center"
      )}
    >
      <DialogPanel
        className={clsx(
          "rounded-md bg-white p-4 w-[25rem] border shadow-sm h-auto max-h-full overflow-x-auto",
          className
        )}
      >
        {title && (
          <DialogTitle>
            <div className="flex justify-between items-center w-full pb-5">
              <p className="font-medium text-lg">{title}</p>
              {showTitle && (
                <XMarkIcon
                  className="h-6 rounded-full hover:bg-gray-100 cursor-pointer"
                  onClick={() => closeDialog()}
                />
              )}
            </div>
          </DialogTitle>
        )}
        <div className="flex flex-col gap-3">{children}</div>
      </DialogPanel>
    </Dialog>
  );
};

export { DialogComp, DialogButton };
