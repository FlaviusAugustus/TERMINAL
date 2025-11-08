import { Step, UpdateStep } from "./Step";
import { Tag } from "./Tag";
import { Project } from "@playwright/test";

export type Process = {
  id: string;
  code: Code;
  projects: string[];
  createdAtUtc: Date;
  comment: string;
};

export type Code = {
  prefix: string;
  sequentialNumber: number;
};

export type ProcessDetailsDto = Omit<Process, "projects"> & {
  recipe?: string;
  projects: Project[];
  steps: Step[];
  tags: Tag[];
};

export type CreateSample = {
  projectId: string;
  recipeId?: string;
  steps: Step[];
  tagIds: string[];
  comment: string;
  saveAsRecipe: boolean;
  recipeName?: string;
};

export type UpdateSample = {
  projectId: string;
  id: string;
  recipeId?: string;
  steps: UpdateStep[];
  tagIds: string[];
  comment?: string | null;
};
