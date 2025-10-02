import Chip from "@components/shared/Chip.tsx";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface SelectedValue {
  name: string;
}

type SelectedValuesProp<T extends SelectedValue> = {
  values: T[];
  handleRemove?: (value: T) => void;
};

const SelectedValues = <T extends SelectedValue>({
  values,
  handleRemove,
}: SelectedValuesProp<T>) => {
  return (
    <div className="flex flex-row flex-wrap gap-1 rounded-[10px] align-middle">
      {values.map((value: T, i: number) => (
        <SelectedValue
          key={i}
          value={value}
          handleRemove={handleRemove}
          displayValue={value.name}
        />
      ))}
    </div>
  );
};

type SelectedValueProp<T> = {
  value: T;
  displayValue: string;
  handleRemove?: (value: T) => void;
};

const SelectedValue = <T,>({
  value,
  displayValue,
  handleRemove,
}: SelectedValueProp<T>) => {
  return (
    <div className={"flex items-center text-xs mt-1"}>
      <Chip value={displayValue} getColorValue={() => "gray"}>
        {handleRemove && (
          <button
            className="items-center text-gray-900 hover:text-gray-400 pl-1"
            onClick={() => handleRemove(value)}
          >
            <XMarkIcon className="h-4 rounded-lg bg-white p-0.5" />
          </button>
        )}
      </Chip>
    </div>
  );
};

export default SelectedValues;
