import {
  SampleDetailsDto,
  StepParameterValueDto,
  UpdateSampleRequest,
  UpdateSampleStepDto,
} from "@api/terminalSchemas";

function sampleToUpdateRequest(sample: SampleDetailsDto): UpdateSampleRequest {
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
      } as UpdateSampleStepDto;
    }),
  };
}

export { sampleToUpdateRequest };
