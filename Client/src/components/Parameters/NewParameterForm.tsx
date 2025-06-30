import InputField from "@components/Shared/InputField.tsx";
import {DialogButton} from "@components/Shared/DialogComp.tsx";
import {AllParametersRequest, ParameterType} from "@api/models/Parameters.ts";
import {
    LabeledSelect,
    SelectItem,
} from "@components/Shared/LabeledSelect.tsx";
import {useState} from "react";
import NewParameterAllowedValues from "@components/Parameters/NewParameterAllowedValues.tsx";
import {toastPromise} from "../../utils/toast.utils.tsx";
import {useAddParameter} from "@hooks/parameters/useAddParameter.ts";
import Form from "@components/Shared/Form.tsx";

const NewParameterForm = () => {
    const [parameterRequest, setParameterRequest] =
      useState<AllParametersRequest>({
          $type: "integer",
          name: "",
          unit: "",
      });

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
            setParameterRequest({...parameterRequest, allowedValues: newValues});
        }
    };
    const setAllowedValue = (index: number, value: string) => {
        if (parameterRequest.$type == "text") {
            const newValues = [...parameterRequest.allowedValues];
            newValues[index] = value;
            setParameterRequest({...parameterRequest, allowedValues: newValues});
        }
    };
    const {mutateAsync} = useAddParameter();

    const handleChangeValue = (attr: string, value: string) => {
        setParameterRequest({
            ...parameterRequest,
            [attr]: value,
        })
    }

    const handleChangeType = (value: ParameterType) => {
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
    }

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
        });
    };

    return (
      <div className="flex flex-col">
          <Form handleSubmit={handleSubmit}>
              <div className="gap-3 pb-2">
                  <InputField
                    required
                    label="Name"
                    value={parameterRequest.name}
                    minLength={3}
                    maxLength={50}
                    onChange={(e) => handleChangeValue("name", e.target.value)}
                  />
                  <LabeledSelect
                    label="Type"
                    value={parameterRequest.$type}
                    onChange={handleChangeType}
                  >
                      <SelectItem value="integer" displayValue="Integer"/>
                      <SelectItem value="decimal" displayValue="Decimal"/>
                      <SelectItem value="text" displayValue="Text"/>
                  </LabeledSelect>
                  {parameterRequest.$type !== "text" && (
                    <InputField
                      required
                      label="Unit"
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
              <DialogButton className="hover:border-green-400" type="submit">
                  Add Parameter
              </DialogButton>
          </Form>
      </div>
    );
};

export default NewParameterForm;
