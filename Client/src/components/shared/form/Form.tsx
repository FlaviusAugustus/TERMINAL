import FormContext from "@hooks/useFormContext";
import { ComponentProps, PropsWithChildren, useRef, useState } from "react";

type FormProps = PropsWithChildren<ComponentProps<"form">> & {
  handleSubmit: () => Promise<void>;
};

const Form = ({ handleSubmit, children, ...rest }: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formValid, setFormValid] = useState(true);

  const handleChange = () => {
    if (!formValid) {
      setFormValid(true);
    }
  };

  return (
    <form
      noValidate
      {...rest}
      ref={formRef}
      onChange={handleChange}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (formRef.current?.checkValidity()) {
          handleSubmit().then(() => {
            formRef.current?.reset();
          });
        }
        setFormValid(formRef.current?.checkValidity() || false);
      }}
    >
      <FormContext.Provider value={{ formValidity: formValid }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};

export default Form;
