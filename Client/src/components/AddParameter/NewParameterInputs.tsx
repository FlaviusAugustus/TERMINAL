import LabeledInput from "@components/Shared/Form/LabeledInput.tsx";
import {
  LabeledSelect,
  SelectItem,
} from "@components/Shared/Form/LabeledSelect.tsx";
import NewParameterAllowedValues from "@components/AddParameter/NewParameterAllowedValues.tsx";
import { AllParametersRequest, ParameterType } from "@api/models/Parameters.ts";

type NewParameterInputsProps = {
  parameterRequest: AllParametersRequest;
  addAllowedValue: () => void;
  deleteAllowedValue: (index: number) => void;
  setAllowedValue: (index: number, value: string) => void;
  handleChangeValue: (attr: string, value: string) => void;
  handleChangeType: (type: ParameterType) => void;
};

const NewParameterInputs = ({
  parameterRequest,
  addAllowedValue,
  deleteAllowedValue,
  setAllowedValue,
  handleChangeValue,
  handleChangeType,
}: NewParameterInputsProps) => {
  return (
    <div className="gap-3 pb-2">
      <LabeledInput
        required
        label="Name"
        name="Name"
        value={parameterRequest.name}
        minLength={3}
        maxLength={50}
        onChange={(e) => handleChangeValue("name", e.target.value)}
      />
      <LabeledSelect
        label="Type"
        name="Type"
        value={parameterRequest.$type}
        onChange={handleChangeType}
      >
        <SelectItem value="integer" displayValue="Integer" />
        <SelectItem value="decimal" displayValue="Decimal" />
        <SelectItem value="text" displayValue="Text" />
      </LabeledSelect>
      {parameterRequest.$type !== "text" && (
        <LabeledInput
          required
          label="Unit"
          name="Unit"
          minLength={3}
          maxLength={50}
          value={parameterRequest.unit}
          onChange={(e) => handleChangeValue("unit", e.currentTarget.value)}
        />
      )}
      {parameterRequest.$type === "text" && (
        <NewParameterAllowedValues
          parameterRequest={parameterRequest}
          addAllowedValue={addAllowedValue}
          removeAllowedValue={deleteAllowedValue}
          setAllowedValue={setAllowedValue}
        />
      )}
    </div>
  );
};

export default NewParameterInputs;
