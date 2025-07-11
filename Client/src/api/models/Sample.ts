import { Step, UpdateStep } from "./Step";
import { Tag } from "./Tag";

export type Sample = {
  id: string;
  code: string;
  project: string;
  createdAtUtc: Date;
  comment: string;
};

export type SampleDetailsDto = Omit<Sample, "project"> & {
  recipe?: string;
  projectId: string;
  steps: Step[];
  tags: Tag[];
};

export type UpdateSample = {
  projectId: string;
  id: string;
  recipeId?: string;
  steps: UpdateStep[];
  tagIds: string[];
  comment?: string | null;
};
