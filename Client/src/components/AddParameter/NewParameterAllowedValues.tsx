import IconButton from "@components/Shared/IconButton.tsx";
import {PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {TextParameterRequest} from "@api/models/Parameters.ts";
import InputField from "@components/Shared/InputField.tsx";

type NewParameterAllowedValuesProps = {
    parameterRequest: TextParameterRequest;
    addAllowedValue: () => void;
    removeAllowedValue: (index: number) => void;
    setAllowedValue: (index: number, value: string) => void;
};

const NewParameterAllowedValues = ({
                                       parameterRequest,
                                       addAllowedValue,
                                       removeAllowedValue,
                                       setAllowedValue,
                                   }: NewParameterAllowedValuesProps) => {
    return (
      <div>
          <div className="flex justify-between items-center py-3 gap-2">
              <p className="text-sm text-gray-700">
                  Allowed values ({parameterRequest.allowedValues.length}):
              </p>
              <IconButton className="text-xs" onClick={addAllowedValue} type="button">
                  <PlusIcon className="h-4"/>
              </IconButton>
          </div>
          <div className="flex flex-col">
              {parameterRequest.allowedValues.map((value, index) => (
                <div key={index} className="flex gap-2">
                    <div className="w-full">
                        <InputField
                          width="100%"
                          name={`Value - ${index}`}
                          className="flex-grow"
                          value={value}
                          onChange={(e) => setAllowedValue(index, e.currentTarget.value)}
                        />
                    </div>
                    <IconButton
                      onClick={() => removeAllowedValue(index)}
                      className="h-[42px] w-[42px] flex items-center justify-center"
                    >
                        <XMarkIcon className="h-5"/>
                    </IconButton>
                </div>
              ))}
          </div>
      </div>
    );
};

export default NewParameterAllowedValues;
