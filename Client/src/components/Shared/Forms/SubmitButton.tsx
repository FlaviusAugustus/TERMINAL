import { Button } from '@headlessui/react';
import LoadingIndicator from "../../Login/LoadingIndicator.tsx";


export interface SubmitButtonProps {
  label: string;
  isLoading?: boolean;
}

/**
 * SubmitButton Component
 *
 * A button component for form submission. It displays a loading indicator when the form is being submitted.
 * The button is disabled while in the loading state.
 *
 * @component
 * @example
 * ```tsx
 * <SubmitButton label="Sign in" isLoading={false} />
 * ```
 *
 * @param {SubmitButtonProps} props - The props for the SubmitButton component.
 * @returns {JSX.Element} - The rendered SubmitButton component.
 */
const SubmitButton = ({ label, isLoading }: SubmitButtonProps) => (
  <div className="w-full">
    <Button
      type="submit"
      className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gray-600 py-2 px-4 text-base font-medium text-white shadow-inner shadow-white/10 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      disabled={isLoading}
    >
      {isLoading ? <LoadingIndicator /> : label}
      {isLoading && 'Loading...'}
    </Button>

  </div>
);

export default SubmitButton;