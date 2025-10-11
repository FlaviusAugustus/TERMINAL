import React, { createContext, useContext, ReactNode } from "react";

type FormContextState = {
  formValidity: boolean;
};

// Create context with initial empty state
const FormContext = createContext<FormContextState | undefined>(undefined);

// Props for our provider component
type FormProviderProps = FormContextState & {
  children: ReactNode;
};

export const FormProvider: React.FC<FormProviderProps> = ({
  formValidity,
  children,
}) => {
  const contextValue: FormContextState = {
    formValidity,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useFormContext = (): FormContextState => {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }

  return context;
};

// Export the context for direct use if needed
export default FormContext;
