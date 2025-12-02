import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  LabeledSelect,
  SelectItem,
} from "@components/shared/form/LabeledSelect.tsx";
import { Project } from "@api/models/Project.ts";
import { useGetProjectAmount } from "@hooks/projects/useGetProjectAmount.ts";
import { useAllProjects } from "@hooks/projects/useGetAllProjects.ts";

export type LabeledProjectInputHandle = {
  isValid: () => boolean;
  markTouched: (v?: boolean) => void;
};

type ProjectInputProps = {
  projects: Project[];
  setPojects: (newProjects: Project[]) => void;
  required?: boolean;
};

// eslint-disable-next-line react/display-name
const LabeledProjectInput = forwardRef<
  LabeledProjectInputHandle,
  ProjectInputProps
>(({ projects, setPojects, required = false }, ref) => {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!required) {
      setError(null);
      return;
    }
    if (!touched) {
      setError(null);
      return;
    }
    setError(
      projects.length > 0 ? null : "At least one project must be selected."
    );
  }, [projects, touched, required]);

  useImperativeHandle(ref, () => ({
    isValid: () => {
      if (!required) return true;
      return projects.length > 0;
    },
    markTouched: (v = true) => setTouched(v),
  }));

  const handleAddProject = (newProjects: Project[]) => {
    if (newProjects != null) {
      setPojects(newProjects);
    }
  };

  const handleRemoveProject = (removedProject: Project) => {
    setPojects(projects.filter((project) => project.id !== removedProject.id));
  };

  return (
    <>
      <LabeledSelect<Project, true>
        multiple
        label="Projects"
        name="AddProject"
        onChange={(p) => {
          handleAddProject(p);
          setTouched(true);
        }}
        value={projects}
        handleRemoveValue={(project: Project) => {
          handleRemoveProject(project);
          setTouched(true);
        }}
      >
        {availableProjects?.map((project: Project) => (
          <SelectItem
            key={project.id}
            value={project}
            displayValue={project.name}
          />
        ))}
      </LabeledSelect>

      <div className="h-5">
        <p role="alert" className="text-xs text-red-500">
          {error ?? ""}
        </p>
      </div>
    </>
  );
});

export default LabeledProjectInput;
