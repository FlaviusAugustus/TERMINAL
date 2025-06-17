export type ParameterType = "decimal" | "text" | "integer";

export type ParameterValue<T> = {
  value: T;
  defaultValue: number;
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
  };

export type DecimalParameter = NumericParameter &
  ParameterValue<number> & {
    $type: "decimal";
  };

export type TextParameter = Parameter &
  ParameterValue<string> & {
    $type: "text";
    allowedValues: string[];
  };

export type UpdateParameter = {
  id: string;
  value: number | string;
};

export type AllParameters = IntegerParameter | DecimalParameter | TextParameter;
