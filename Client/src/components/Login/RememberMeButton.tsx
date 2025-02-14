import { useState } from "react";
import { Checkbox, Field, Label } from "@headlessui/react";

/**
 * RememberMeButton Component
 *
 * A component that renders a "Remember me" checkbox and a "Forgot password?" link.
 * The checkbox allows users to indicate whether they want to be remembered on the device.
 *
 * @example
 * ```tsx
 * <RememberMeButton />
 * ```
 *
 * @returns {JSX.Element} - The rendered RememberMeButton component.
 */

const RememberMeButton = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between w-full">
        <Field className="flex items-center gap-2 mt-3">
        <Checkbox
            checked={enabled}
            onChange={setEnabled}
            className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
            >
            <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </Checkbox>
        <Label className="text-sm font-medium text-gray-700">Remember me</Label>
        </Field>

        <div className="text-sm mt-3">
            <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
            >
            Forgot password?
            </a>
        </div>
    </div>
  );
};

export default RememberMeButton;
