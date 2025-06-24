import { useEffect, useState } from "react";

type UseEditableFormReturn<T> = {
  data: T | undefined;
  setData: (newData: T) => void;
  hasChanges: boolean;
  resetForm: () => void;
  setInitial: (newInitial: T | undefined) => void;
};

function useEditableForm<T>(
  initialValue: T | undefined,
): UseEditableFormReturn<T> {
  const [initial, setInitial] = useState<T | undefined>(initialValue);
  const [data, setData] = useState<T | undefined>(initialValue);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setInitial(initialValue);
    setData(initialValue);
    setHasChanges(false);
  }, [initialValue]);

  const resetForm = () => {
    setData(structuredClone(initial));
    setHasChanges(false);
  };

  return {
    data,
    setData: (val: T) => {
      setData(val);
      setHasChanges(true);
    },
    hasChanges,
    resetForm,
    setInitial,
  };
}

export default useEditableForm;
