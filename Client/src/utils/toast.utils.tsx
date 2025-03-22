import toast, { ToastPosition } from 'react-hot-toast';

export const toastOptions = {
    success: {
        style: {
            borderLeft: '4px solid #10B981'
        },
    },
    error: {
        style: {
            borderLeft: '4px solid #EF4444',
        },
    },
    loading: {
        duration: Infinity,
        style: { borderLeft: '4px solid #2563EB' },
    },
}

const defaultOptions = {
    position: 'top-right' as ToastPosition,
    duration: 5000,
};

export const toastSuccess = (message: string) => {
    toast.success(message, {
        ...defaultOptions,
        ...toastOptions.success,
    });
}

export const toastError = (message: string) => {
    toast.error(message, {
        ...defaultOptions,
        ...toastOptions.error,
    });
}

export const toastLoading = (message: string) => {
    toast.loading(message, {
        ...defaultOptions,
        ...toastOptions.loading,
    });
}

export const toastNotify = {
    success: toastSuccess,
    error: toastError,
    loading: toastLoading,
}

export const toastPromise = (promise: Promise<unknown>, messages: {
    success: string;
    error: string;
    loading: string;
}) => {
    return toast.promise(promise, messages, {
        position: defaultOptions.position,
    });
};

export default toast;