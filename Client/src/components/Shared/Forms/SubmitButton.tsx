import { Button } from '@headlessui/react';
import clsx from "clsx";

/**
 * Props interface for SubmitButton component
 */
export interface SubmitButtonProps {
  label: string;
  isLoading?: boolean;
}

/**
 * SubmitButton Component
 *
 * A simple submit button component that indicates a loading state.
 *
 * @component
 * @param {SubmitButtonProps} props - The props for the SubmitButton component
 */
const SubmitButton = ({ label, isLoading }: SubmitButtonProps) => (
  <div className="w-full">
      <Button
          type="submit"
          className={clsx(
              'mt-8 w-full rounded-xl py-2 px-4 text-white bg-gray-600 hover:bg-gray-500',
              { 'bg-gray-300 hover:bg-gray-300' : isLoading }
          )}
          disabled={isLoading}
      >
          {label}
      </Button>
  </div>
);

export default SubmitButton;