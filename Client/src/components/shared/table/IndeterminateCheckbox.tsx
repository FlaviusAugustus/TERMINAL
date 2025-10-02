import { HTMLProps, useRef, useEffect } from "react";

const IndeterminateCheckbox = ({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <div className="flex">
      <input
        type="checkbox"
        ref={ref}
        className={
          className +
          "peer relative cursor-pointer group block size-5 rounded border appearance-none bg-white checked:bg-gray-100"
        }
        {...rest}
      />
      <svg
        className="absolute w-5 h-5 pointer-events-none peer-checked:block outline-none stroke-gray-900 peer-checked:opacity-100 opacity-0"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          d="M3 8L6 11L11 3.5"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default IndeterminateCheckbox;
