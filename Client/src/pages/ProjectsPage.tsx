import Projects from "@components/projects/Projects.tsx";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useAllProjects } from "@hooks/projects/useGetAllProjects.ts";
import { toastPromise } from "@utils/toast.utils.tsx";
import { useDeleteProject } from "@hooks/projects/useDeleteProject.ts";
import TableLayout from "./layouts/TableLayout";
import ComponentOrLoader from "@components/shared/loader/ComponentOrLoader.tsx";
import Loader from "@components/shared/loader/Loader.tsx";
import { useProjectDetails } from "@hooks/projects/useGetProjectDetails.ts";
import ProjectEdit from "@components/projects/ProjectEdit.tsx";
import { useUpdateProjectName } from "@hooks/projects/useUpdateProjectName.ts";
import { useUpdateProjectStatus } from "@hooks/projects/useUpdateProjectStatus.ts";
import { useSearchProjects } from "@hooks/projects/useSearchProjects.ts";

const ProjectsPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchPhrase, setSearchPhrase] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [projectDetailsId, setProjectDetailsId] = useState<string | null>(null);

  const queryProjects = useAllProjects({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const searchProjectsQuery = useSearchProjects({
    searchPhrase,
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const dataQueryProjects = searchPhrase ? searchProjectsQuery : queryProjects;

  const queryProjectDetails = useProjectDetails(projectDetailsId);

  const deleteMutation = useDeleteProject({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const updateNameMutation = useUpdateProjectName({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const updateActivityMutation = useUpdateProjectStatus({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const handleDelete = async (id: string | null) => {
    if (!id) return;
    await toastPromise(deleteMutation.mutateAsync(id), {
      loading: "Deleting project...",
      success: "Deletion successful",
      error: "Deletion failed",
    });
  };

  const handleEdit = async (id: string | null) => {
    setProjectDetailsId(id);
    setEditOpen(true);
  };

  const handleSubmit = async (id: string, name: string, isActive: boolean) => {
    if (queryProjectDetails.data?.name !== name) {
      await toastPromise(updateNameMutation.mutateAsync({ id, name }), {
        success: "Name updated successfully",
        error: "Failed to update name",
        loading: "Updating name...",
      });
    }

    if (queryProjectDetails.data?.isActive !== isActive) {
      await toastPromise(updateActivityMutation.mutateAsync({ id, isActive }), {
        success: "Project status updated successfully",
        error: "Failed to update project status",
        loading: "Updating project status...",
      });
    }
  };

  return (
    <TableLayout>
      <ComponentOrLoader
        isLoading={dataQueryProjects.isLoading}
        loader={<Loader />}
      >
        <Projects
          projects={dataQueryProjects.data}
          sorting={sorting}
          setSorting={setSorting}
          pagination={pagination}
          setPagination={setPagination}
          onChangeProjectDetails={() => {}}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchProps={{
            onSearch: setSearchPhrase,
            searchValue: searchPhrase,
            onClearSearch: () => setSearchPhrase(""),
          }}
        />
      </ComponentOrLoader>
      <ComponentOrLoader
        isLoading={queryProjectDetails.isLoading}
        loader={<Loader />}
      >
        <ProjectEdit
          project={queryProjectDetails.data!}
          onSubmit={handleSubmit}
          open={editOpen}
          setOpen={setEditOpen}
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default ProjectsPage;
