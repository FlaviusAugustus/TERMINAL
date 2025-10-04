export type ParameterType = "Decimal" | "Text" | "Integer";

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
  $type: "Decimal" | "Integer";
  unit: string;
};

export type IntegerParameter = NumericParameter &
  ParameterValue<number> & {
    $type: "Integer";
  };

export type DecimalParameter = NumericParameter &
  ParameterValue<number> & {
    $type: "Decimal";
  };

export type TextParameter = Parameter &
  ParameterValue<string> & {
    $type: "Text";
    allowedValues: string[];
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
  $type: "Decimal" | "Integer";
  unit: string;
};

export type TextParameterRequest = ParameterRequest & {
  $type: "Text";
  allowedValues: string[];
};

export type AllParametersRequest =
  | NumericParameterRequest
  | TextParameterRequest;
