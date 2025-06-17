export type Value = {
    value: string;
}

export type ParameterDetails = {
    defaultValue: number;
    id: Value;
    name: Value;
    order: number;
    isActive: boolean;
    parent: string | null;
}

export type ParameterTextDetails = ParameterDetails & {
    allowedValues: Array<string>;
}

export type ParameterNumericDetails = ParameterDetails & {
    step: number;
    unit: string;
}

export type AllParameterDetails = ParameterTextDetails | ParameterNumericDetails