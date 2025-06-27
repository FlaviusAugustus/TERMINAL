import InputField from "@components/Shared/InputField.tsx";
import { DialogButton } from "@components/Shared/DialogComp.tsx";
import { AllParametersRequest } from "@api/models/Parameters.ts";
import {
  LabeledSelect,
  SelectItem,
} from "@components/Shared/LabeledSelect.tsx";
import { useState } from "react";
import NewParameterAllowedValues from "@components/Parameters/NewParameterAllowedValues.tsx";
import { toastPromise } from "../../utils/toast.utils.tsx";
import { useAddParameter } from "@hooks/parameters/useAddParameter.ts";

const NewParameterForm = () => {
  const [parameterRequest, setParameterRequest] =
    useState<AllParametersRequest>({
      $type: "integer",
      name: "",
      unit: "",
    });
  const [isParameterNameValid, setIsParameterNameValid] = useState(true);

  const addAllowedValue = () => {
    if (parameterRequest.$type == "text")
      setParameterRequest({
        ...parameterRequest,
        allowedValues: [...parameterRequest.allowedValues, ""],
      });
  };
  const deleteAllowedValue = (index: number) => {
    if (parameterRequest.$type == "text") {
      const newValues = parameterRequest.allowedValues.filter(
        (_, i) => i !== index,
      );
      setParameterRequest({ ...parameterRequest, allowedValues: newValues });
    }
  };
  const setAllowedValue = (index: number, value: string) => {
    if (parameterRequest.$type == "text") {
      const newValues = [...parameterRequest.allowedValues];
      newValues[index] = value;
      setParameterRequest({ ...parameterRequest, allowedValues: newValues });
    }
  };
  const { mutateAsync } = useAddParameter();

  const handleSubmit = async () => {
    const parameterNameIsValid = checkIfNameIsValid(parameterRequest.name);
    setIsParameterNameValid(parameterNameIsValid);

    if (!parameterNameIsValid) return;
    await toastPromise(mutateAsync(parameterRequest), {
      success: "Parameter added successfully",
      loading: "Adding parameter...",
      error: "Failed adding parameter",
    });
    setParameterRequest({
      $type: "integer",
      name: "",
      unit: "",
    });
  };

  const checkIfNameIsValid = (name: string) => {
    return name.length >= 3 && name.length <= 50;
  };

  return (
    <div className="flex flex-col">
      <div className="gap-3 pb-2">
        <InputField
          label="Name"
          value={parameterRequest.name}
          isValid={isParameterNameValid}
          onChange={(e) =>
            setParameterRequest({
              ...parameterRequest,
              name: e.currentTarget.value,
            })
          }
          validationInfo="Parameter name must be between 3 and 50 characters long"
        />
        <LabeledSelect
          label="Type"
          value={parameterRequest.$type}
          onChange={(value) => {
            if (!value) return;
            if (value === "text")
              setParameterRequest({
                $type: value,
                name: parameterRequest.name,
                allowedValues: [""],
              });
            else
              setParameterRequest({
                $type: value,
                name: parameterRequest.name,
                unit: "",
              });
          }}
        >
          <SelectItem value="integer" displayValue="Integer" />
          <SelectItem value="decimal" displayValue="Deciaml" />
          <SelectItem value="text" displayValue="Text" />
        </LabeledSelect>
        {parameterRequest.$type !== "text" && (
          <InputField
            label="Unit"
            value={parameterRequest.unit}
            onChange={(e) =>
              setParameterRequest({
                ...parameterRequest,
                unit: e.currentTarget.value,
              })
            }
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
      <DialogButton className="hover:border-green-400" onClick={handleSubmit}>
        Add Parameter
      </DialogButton>
    </div>
  );
};

export default NewParameterForm;
