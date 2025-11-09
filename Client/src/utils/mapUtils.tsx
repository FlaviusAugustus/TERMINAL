import { StepParameterValueDto } from "@api/models/Parameters";
import { ProcessDetailsDto, UpdateProcess } from "@api/models/Process.ts";
import { UpdateStep } from "@api/models/Step";

function sampleToUpdateRequest(sample: ProcessDetailsDto): UpdateProcess {
  return {
    id: sample.id,
    projects: sample.projects.map((p) => p.id),
    recipeId: sample.recipe,
    tagIds: sample.tags?.filter((t) => t.id !== undefined).map((t) => t.id!),
    comment: sample.comment,
    steps: sample.steps?.map((s) => {
      return {
        comment: s.comment,
        id: s.id,
        parameters: s.parameters?.map((p) => {
          return {
            $type: p.$type,
            value: p.value,
            id: p.id,
          } satisfies StepParameterValueDto;
        }),
      } as UpdateStep;
    }),
  };
}

export { sampleToUpdateRequest };
