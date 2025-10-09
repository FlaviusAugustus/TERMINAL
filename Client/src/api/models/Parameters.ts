export type ParameterType = "decimal" | "text" | "integer";

export type ParameterValue<T> = {
  value: T;
};

export type Parameter = {
  $type: ParameterType;
  step: number;
  id: string;
  name: string;
  order: number;
  parentId: string;
};

export type NumericParameter = Parameter & {
  $type: "decimal" | "integer";
  unit: string;
};

export type IntegerParameter = NumericParameter &
  ParameterValue<number> & {
    $type: "integer";
    defaultValue: number;
  };

export type DecimalParameter = NumericParameter &
  ParameterValue<number> & {
    $type: "decimal";
    defaultValue: number;
  };

export type TextParameter = Parameter &
  ParameterValue<string> & {
    $type: "text";
    allowedValues: string[];
    defaultValue: string;
  };

export type UpdateParameter = {
  id: string;
  value: number | string;
};

export type StepParameterValueDto = {
  $type: ParameterType;
  id: string;
  value: string | number;
};

export type ParameterResponse = { parameters: AllParameters[] };

export type AllParameters = IntegerParameter | DecimalParameter | TextParameter;

export type ParameterRequest = {
  $type: ParameterType;
  name: string;
};

export type NumericParameterRequest = ParameterRequest & {
  $type: "decimal" | "integer";
  unit: string;
};

export type TextParameterRequest = ParameterRequest & {
  $type: "text";
  allowedValues: string[];
};

export type AllParametersRequest =
  | NumericParameterRequest
  | TextParameterRequest;
