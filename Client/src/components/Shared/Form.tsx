import { ComponentProps, PropsWithChildren, useRef } from "react";

type FormProps = PropsWithChildren<ComponentProps<"form">> & {
  handleSubmit: () => Promise<void>;
};

const Form = ({ handleSubmit, children, ...rest }: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      noValidate
      {...rest}
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (formRef.current?.checkValidity()) handleSubmit();
      }}
    >
      {children}
    </form>
  );
};

export default Form;
