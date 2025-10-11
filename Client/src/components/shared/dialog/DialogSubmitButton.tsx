import { ButtonHTMLAttributes } from "react";
import { DialogButton } from "./DialogButton";

type DialogSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting: boolean;
};

/**
 * DialogSubmitButton Component
 *
 * A button component styled for use within a dialog. Supports submitting
 *
 * @component
 */
const DialogSubmitButton = ({
  isSubmitting,
  children,
  ...rest
}: DialogSubmitButtonProps) => {
  return (
    <DialogButton {...rest}>
      {isSubmitting ? "Loading..." : children}
    </DialogButton>
  );
};

export { DialogSubmitButton };
