import IconButton from "@components/Shared/IconButton.tsx";
import {MinusIcon, PlusIcon} from "@heroicons/react/24/outline";
import {TextParameterRequest} from "@api/models/Parameters.ts";
import InputField from "@components/Shared/InputField.tsx";


type NewParameterAllowedValuesProps = {
    parameterRequest: TextParameterRequest;
    increaseAllowedValues: () => void;
    decreaseAllowedValues: () => void;
    setAllowedValue: (index: number, value: string) => void;
}

const NewParameterAllowedValues = (
  {
      parameterRequest,
      increaseAllowedValues,
      decreaseAllowedValues,
      setAllowedValue
  }: NewParameterAllowedValuesProps) => {
    return (
      <div>
          <div className="flex justify-center py-2 gap-2">
              <IconButton onClick={decreaseAllowedValues}
                          className="h-[40px] flex bg-white items-center gap-1 !hover:border-red-200"
                          disabled={parameterRequest.allowedValues.length == 1}
              >
                  <MinusIcon className="h-4"/>
              </IconButton>
              <div className="flex flex-col justify-center">
                  {parameterRequest.allowedValues.length}
              </div>
              <IconButton onClick={increaseAllowedValues}
                          className="h-[40px] flex bg-white items-center gap-1 !hover:border-red-200"
              >
                  <PlusIcon className="h-4"/>
              </IconButton>
          </div>
          <div className="flex flex-col">
              {parameterRequest.allowedValues.map((value, index) => (
                <InputField
                  key={index}
                  label={`Value ${index + 1} `}
                  value={value}
                  onChange={(e) => setAllowedValue(index, e.currentTarget.value)}
                />
              ))}
          </div>
      </div>
    );
};

export default NewParameterAllowedValues;