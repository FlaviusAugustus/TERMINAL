import { Switch, SwitchProps } from "@headlessui/react";
import clsx from "clsx";
import LabeledField from "./LabeledField";

type LabeledSwitchProps = SwitchProps & { label?: string };

const LabeledSwitch = ({ label, ...switchProps }: LabeledSwitchProps) => {
  return (
    <LabeledField label={label}>
      <Switch
        {...switchProps}
        className={"toggle rounded-full toggle-success toggle-lg"}
      >
        <span
          className={clsx(
            "size-4 rounded-full bg-white transition",
            switchProps.checked ? "translate-x-6" : "translate-x-1"
          )}
        ></span>
      </Switch>
    </LabeledField>
  );
};

export default LabeledSwitch;
