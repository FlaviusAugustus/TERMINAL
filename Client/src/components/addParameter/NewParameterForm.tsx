import { AllParametersRequest, ParameterType } from "@api/models/Parameters.ts";
import { useState } from "react";
import { toastPromise } from "@utils/toast.utils.tsx";
import { useAddParameter } from "@hooks/parameters/useAddParameter.ts";
import Form from "@components/shared/form/Form.tsx";
import NewParameterInputs from "@components/addParameter/NewParameterInputs.tsx";
import SubmitButton from "@components/shared/form/SubmitButton.tsx";

const NewParameterForm = () => {
  const [parameterRequest, setParameterRequest] =
    useState<AllParametersRequest>({
      $type: "integer",
      name: "",
      unit: "",
      step: 1,
    });

  const addAllowedValue = () => {
    if (parameterRequest.$type == "text")
      setParameterRequest({
        ...parameterRequest,
        allowedValues: [...parameterRequest.allowedValues, ""],
      });
  };
  const deleteAllowedValue = (index: number) => {
    if (
      parameterRequest.$type == "text" &&
      parameterRequest.allowedValues.length > 1
    ) {
      const newValues = parameterRequest.allowedValues.filter(
        (_, i) => i !== index
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
  const { mutateAsync, isPending } = useAddParameter();

  const handleChangeValue = (attr: string, value: string | number) => {
    setParameterRequest({
      ...parameterRequest,
      [attr]: value,
    });
  };

  const handleChangeType = (value: ParameterType) => {
    if (!value) return;
    if (value === "text")
      setParameterRequest({
        $type: value,
        name: parameterRequest.name,
        allowedValues: [""],
      });
    else if (value === "integer")
      setParameterRequest({
        $type: value,
        name: parameterRequest.name,
        unit: "",
        step: 1,
      });
    else
      setParameterRequest({
        $type: value,
        name: parameterRequest.name,
        unit: "",
        step: 0.1,
      });
  };

  const handleSubmit = async () => {
    await toastPromise(mutateAsync(parameterRequest), {
      success: "Parameter added successfully",
      loading: "Adding parameter...",
      error: "Failed adding parameter",
    });
    setParameterRequest({
      $type: "integer",
      name: "",
      unit: "",
      step: 1,
    });
  };

  return (
    <div className="flex flex-col">
      <Form handleSubmit={handleSubmit}>
        <NewParameterInputs
          parameterRequest={parameterRequest}
          addAllowedValue={addAllowedValue}
          deleteAllowedValue={deleteAllowedValue}
          setAllowedValue={setAllowedValue}
          handleChangeValue={handleChangeValue}
          handleChangeType={handleChangeType}
        />
        <SubmitButton label="Add Parameter" isLoading={isPending} />
      </Form>
    </div>
  );
};

export default NewParameterForm;
