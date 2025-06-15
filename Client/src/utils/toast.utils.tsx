import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import toast, {
  LoaderIcon,
  ToastOptions,
  ToastPosition,
} from "react-hot-toast";

export const toastOptions = {
  success: {
    icon: <CheckIcon className="h-5 text-green-500" />,
  },
  error: {
    icon: <XMarkIcon className="h-5 text-red-500" />,
  },
  loading: {
    duration: Infinity,
    icon: <LoaderIcon className="h-5 text-blue-500" />,
  },
};

const defaultOptions: ToastOptions = {
  className: "h-16 text-sm border !shadow-sm",
  position: "top-right" as ToastPosition,
  duration: 5000,
};

export const toastSuccess = (message: string) => {
  toast.success(message, {
    ...defaultOptions,
    ...toastOptions.success,
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    ...defaultOptions,
    ...toastOptions.error,
  });
};

export const toastLoading = (message: string) => {
  toast.loading(message, {
    ...defaultOptions,
    ...toastOptions.loading,
  });
};

export const toastNotify = {
  success: toastSuccess,
  error: toastError,
  loading: toastLoading,
};

export const toastPromise = async (
  promise: Promise<unknown>,
  messages: {
    success: string;
    error: string;
    loading: string;
  },
): Promise<void> => {
  try {
    await toast.promise(promise, messages, {
      position: defaultOptions.position,
      className: defaultOptions.className,
    });
  } catch {
    // Error is handled by toast.promise
  }
};

export default toast;
