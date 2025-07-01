import {DialogButton} from "@components/Shared/DialogComp.tsx";
import {AllParametersRequest, ParameterType} from "@api/models/Parameters.ts";
import {useState} from "react";
import {toastPromise} from "../../utils/toast.utils.tsx";
import {useAddParameter} from "@hooks/parameters/useAddParameter.ts";
import Form from "@components/Shared/Form.tsx";
import NewParameterInputs from "@components/AddParameter/NewParameterInputs.tsx";

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
              <NewParameterInputs
                parameterRequest={parameterRequest}
                addAllowedValue={addAllowedValue}
                deleteAllowedValue={deleteAllowedValue}
                setAllowedValue={setAllowedValue}
                handleChangeValue={handleChangeValue}
                handleChangeType={handleChangeType}
              />
              <DialogButton className="hover:border-green-400" type="submit">
                  Add Parameter
              </DialogButton>
          </Form>
      </div>
    );
};

export default NewParameterForm;
