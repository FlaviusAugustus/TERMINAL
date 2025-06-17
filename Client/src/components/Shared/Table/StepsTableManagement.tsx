import { SampleStepDto } from "@api/terminalSchemas";
import clsx from "clsx";

type StepsTableManagementProps = {
  steps: SampleStepDto[];
  activeIndex: number;
  activeIndexChange: (arg0: number) => void;
};

const StepsTableManagement = ({
  steps,
  activeIndex,
  activeIndexChange,
}: StepsTableManagementProps) => {
  return (
    <div className="flex gap-2">
      {steps?.map((_, i) => (
        <button
          className={clsx(
            "p-1 text-sm flex items-center justify-center rounded bg-gray-100 border border-gray-200 flex-1 focus:outline-none",
            activeIndex == i && "bg-gray-200 border-gray-300",
          )}
          onClick={() => activeIndexChange(i)}
          key={i}
        >
          Step {i + 1}
        </button>
      ))}
    </div>
  );
};

export default StepsTableManagement;
