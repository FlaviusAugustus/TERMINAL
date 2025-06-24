import { StepParameterValueDto } from "@api/models/Parameters";
import { SampleDetailsDto, UpdateSample } from "@api/models/Sample";
import { UpdateStep } from "@api/models/Step";

function sampleToUpdateRequest(sample: SampleDetailsDto): UpdateSample {
  return {
    id: sample.id,
    projectId: sample.projectId,
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
