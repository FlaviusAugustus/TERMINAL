import Projects from "@components/projects/Projects.tsx";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useAllProjects } from "@hooks/projects/useGetAllProjects.ts";
import { useDeleteProject } from "@hooks/projects/useDeleteProject.ts";
import TableLayout from "./layouts/TableLayout";
import ComponentOrLoader from "@components/shared/loader/ComponentOrLoader.tsx";
import Loader from "@components/shared/loader/Loader.tsx";
import { useProjectDetails } from "@hooks/projects/useGetProjectDetails.ts";
import ProjectEdit from "@components/projects/ProjectEdit.tsx";
import { useUpdateProjectName } from "@hooks/projects/useUpdateProjectName.ts";
import { useUpdateProjectStatus } from "@hooks/projects/useUpdateProjectStatus.ts";
import ConfirmDeleteDialog from "@components/shared/dialog/ConfirmDeleteDialog";
import { toastError } from "@utils/toast.utils.tsx";

const ProjectsPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchPhrase, setSearchPhrase] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [projectDetailsId, setProjectDetailsId] = useState<string | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  const queryProjects = useAllProjects({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
    searchPhrase,
  });

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
    await deleteMutation.mutateAsync(id);
    if (deleteMutation.isSuccess) setDeleteOpen(false);
  };

  const openDeleteDialog = (id: string) => {
    setDeleteOpen(true);
    setDeleteProjectId(id);
  };

  const handleEdit = async (id: string | null) => {
    setProjectDetailsId(id);
    setEditOpen(true);
  };

  const handleSubmit = async (id: string, name: string, isActive: boolean) => {
    const hasNameChanged = queryProjectDetails.data?.name !== name;
    const hasStatusChanged = queryProjectDetails.data?.isActive !== isActive;

    if (!hasNameChanged && !hasStatusChanged) return;

    let errorOccurred = false;

    if (hasNameChanged) {
      try {
        await updateNameMutation.mutateAsync({ id, name });
      } catch {
        toastError(`Error while updating name`);
        errorOccurred = true;
      }
    }

    if (hasStatusChanged) {
      try {
        await updateActivityMutation.mutateAsync({ id, isActive });
      } catch {
        toastError(`Error while updating status`);
        errorOccurred = true;
      }
    }

    if (!errorOccurred) {
      setEditOpen(false);
    }
  };

  return (
    <TableLayout>
      <ComponentOrLoader
        isLoading={queryProjects.isLoading}
        loader={<Loader />}
      >
        <Projects
          projects={queryProjects.data}
          sorting={sorting}
          setSorting={setSorting}
          pagination={pagination}
          setPagination={setPagination}
          onChangeProjectDetails={() => {}}
          onEdit={handleEdit}
          onDelete={openDeleteDialog}
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
          isSubmitting={
            updateNameMutation.isPending || updateActivityMutation.isPending
          }
        />
        <ConfirmDeleteDialog
          onSubmit={() => handleDelete(deleteProjectId)}
          isSubmitting={deleteMutation.isPending}
          isOpen={deleteOpen}
          description={`Deleting the project will remove all associated samples. Type the word delete to confirm`}
          setIsOpen={setDeleteOpen}
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default ProjectsPage;
