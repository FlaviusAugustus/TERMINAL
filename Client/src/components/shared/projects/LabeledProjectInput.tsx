import { forwardRef, useMemo } from "react";
import {
  LabeledSelect,
  LabeledSelectHandle,
  SelectItem,
} from "@components/shared/form/LabeledSelect.tsx";
import { Project } from "@api/models/Project.ts";
import { useGetProjectAmount } from "@hooks/projects/useGetProjectAmount.ts";
import { useAllProjects } from "@hooks/projects/useGetAllProjects.ts";

type ProjectInputProps = {
  projects: Project[];
  setPojects: (newProjects: Project[]) => void;
  required?: boolean;
};

// eslint-disable-next-line react/display-name
const LabeledProjectInput = forwardRef<LabeledSelectHandle, ProjectInputProps>(
  ({ projects, setPojects, required = false }, ref) => {
    const { data: projectAmount } = useGetProjectAmount();

    const allProjects = useAllProjects({
      pageNumber: 0,
      pageSize: projectAmount?.data ?? 0,
      desc: true,
    });

    const availableProjects: Project[] | undefined = useMemo(() => {
      return allProjects.data?.rows?.filter((project) => {
        return !projects.map((p) => p.id).includes(project.id);
      });
    }, [allProjects.data, projects]);

    const handleAddProject = (newProjects: Project[]) => {
      if (newProjects != null) {
        setPojects(newProjects);
      }
    };

    const handleRemoveProject = (removedProject: Project) => {
      setPojects(
        projects.filter((project) => project.id !== removedProject.id)
      );
    };

    return (
      <>
        <LabeledSelect<Project, true>
          ref={ref}
          required={required}
          errorMessage="At least one project must be selected."
          multiple
          label="Projects"
          name="AddProject"
          onChange={handleAddProject}
          value={projects}
          handleRemoveValue={(project: Project) => handleRemoveProject(project)}
        >
          {availableProjects?.map((project: Project) => (
            <SelectItem
              key={project.id}
              value={project}
              displayValue={project.name}
            />
          ))}
        </LabeledSelect>
      </>
    );
  }
);

export default LabeledProjectInput;
