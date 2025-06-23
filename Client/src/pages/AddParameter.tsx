import InputField from "@components/Shared/InputField.tsx";
import {DialogButton} from "@components/Shared/DialogComp.tsx";
import {AllParametersRequest} from "@api/models/Parameters.ts";
import {useState} from "react";
import {LabeledSelect, SelectItem} from "@components/Shared/LabeledSelect.tsx";


const AddParameter = () => {

    const [parameterRequest, setParameterRequest] = useState<AllParametersRequest>({
        $type: "integer",
        name: "",
        unit: ""
    });
    const [isRequestValid] = useState(true);

    const handleSubmit = () => {
        console.log("Submit");
    }
    return (
      <div className="w-full h-full flex items-center justify-center">
          <div className="rounded-md bg-white p-4 w-[25rem] border shadow-sm">
              <div className="flex justify-between items-center w-full pb-5">
                  <p className="font-medium text-lg">Add new parameter</p>
              </div>
              <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                      <InputField
                        label="Name"
                        value={parameterRequest.name}
                        onChange={(e) =>
                          setParameterRequest({...parameterRequest, name: e.currentTarget.value})}
                        isValid={isRequestValid}
                        validationInfo="Parameter name must be between 3 and 50 characters long"
                      />
                      <LabeledSelect
                        label="Type"
                        value={parameterRequest.$type}
                        onChange={(value) => {
                            if (!value) return;
                            if (value === "text")
                                setParameterRequest({$type: value, name: parameterRequest.name, allowedValues: []});
                            else
                                setParameterRequest({$type: value, name: parameterRequest.name, unit: ""});
                        }}
                      >
                          <SelectItem value="integer" displayValue="integer"/>
                          <SelectItem value="decimal" displayValue="decimal"/>
                          <SelectItem value="text" displayValue="text"/>
                      </LabeledSelect>
                      {parameterRequest.$type !== "text" &&
                          <InputField
                              label="Unit"
                              value={parameterRequest.unit}
                              onChange={(e) =>
                                setParameterRequest({...parameterRequest, unit: e.currentTarget.value})}
                              isValid={isRequestValid}
                              validationInfo="Parameter unit must be between 1 and 50 characters long"
                          />
                      }
                      {parameterRequest.$type === "text" &&
                          <>(TEst)</>
                      }
                  </div>
                  <DialogButton
                    className="hover:border-green-400"
                    onClick={handleSubmit}
                  >
                      Add Parameter
                  </DialogButton>
              </div>
          </div>
      </div>
    );
};

export default AddParameter;