import { AllParameters, StepParameterValueDto } from "./Parameters";

export type Step = {
  id: string;
  comment: string;
  parameters: AllParameters[];
};

export type UpdateStep = {
  id: string;
  parameters: StepParameterValueDto[];
  comment: string | null;
};
