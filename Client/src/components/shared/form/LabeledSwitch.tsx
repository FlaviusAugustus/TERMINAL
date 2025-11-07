import { Switch, SwitchProps } from "@headlessui/react";
import clsx from "clsx";
import LabeledField from "./LabeledField";

type LabeledSwitchProps = SwitchProps & { label?: string };

const LabeledSwitch = ({ label, ...switchProps }: LabeledSwitchProps) => {
  return (
    <LabeledField className="flex flex-col" label={label}>
      <Switch
        {...switchProps}
        className={clsx(
          "rounded-full h-7 w-12 border border-black/5 mt-1 transition-colors",
          switchProps.checked ? "bg-green-400" : "bg-gray-100"
        )}
      >
        <span
          className={clsx(
            "size-5 p-2 border border-black/10 block rounded-full transition bg-white shadow-sm",
            switchProps.checked ? "translate-x-6 " : "translate-x-0.5"
          )}
        />
      </Switch>
    </LabeledField>
  );
};

export default LabeledSwitch;
