import FormContext from "@hooks/useFormContext";
import { ComponentProps, PropsWithChildren, useRef, useState } from "react";

type FormProps = PropsWithChildren<ComponentProps<"form">> & {
  handleSubmit: () => Promise<void>;
};

const Form = ({ handleSubmit, children, ...rest }: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formValid, setFormValid] = useState({ formValidity: true });

  const handleChange = () => {
    if (!formValid) {
      setFormValid({ formValidity: true });
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
            setFormValid({ formValidity: true });
            formRef.current?.reset();
          });
          return;
        }
        setFormValid({
          formValidity: formRef.current?.checkValidity() || false,
        });
      }}
    >
      <FormContext.Provider value={formValid}>
        <div className="flex flex-col gap-3">{children}</div>
      </FormContext.Provider>
    </form>
  );
};

export default Form;
