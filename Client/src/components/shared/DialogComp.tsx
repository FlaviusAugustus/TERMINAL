import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { ReactNode, ButtonHTMLAttributes } from "react";

export type DialogProps = {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  title?: string;
  description?: string;
  children?: ReactNode | ReactNode[];
  showTitle?: boolean;
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
}: DialogProps) => {
  const closeDialog = handleClose ?? (() => setIsOpen(false));

  return (
    <Dialog
      open={isOpen}
      onClose={() => closeDialog()}
      transition
      className="fixed inset-0 flex w-screen backdrop-blur-sm items-center justify-center bg-black/30 p-4 transition duration-100 ease-out data-[closed]:opacity-0"
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

/**
 * DialogButton Component
 *
 * A button component styled for use within a dialog.
 *
 * @component
 */
const DialogButton = ({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(
        "font-normal text-sm h-10 bg-gray-100 text-black border w-full inline-flex items-center justify-center gap-2 rounded-md transition-colors duration-100 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:border-gray-300 disabled:bg-gray-200",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export { DialogComp, DialogButton };
