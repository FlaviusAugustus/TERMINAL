import { SampleStepDto } from "@api/terminalSchemas.ts";

interface StepProps {
  step: SampleStepDto;
}

/**
 * Step Component
 *
 * A component that displays a step in a recipe.
 * It renders a table with the parameters of the step, including their name, value, and unit.
 *
 * @component
 */
const Step = (props: StepProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {props.step.parameters?.map((param, index) => {
            return (
              <tr key={index} className="hover:bg-gray-50">
                <td>{param?.name}</td>
                <td>{param?.value}</td>
                <td>{param.$type !== "text" ? param?.unit : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Step;
