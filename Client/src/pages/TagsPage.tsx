import TableLayout from "@pages/layouts/TableLayout.tsx";
import Loader from "@components/Shared/Loader.tsx";
import ComponentOrLoader from "@components/Shared/ComponentOrLoader.tsx";
import Tags from "@components/Tags/Tags.tsx";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useGetAllTags } from "@hooks/tags/useGetAllTags.ts";
import { useGetTagDetails } from "@hooks/tags/useGetTagDetails.ts";
import TagDetails from "@components/Tags/TagDetails.tsx";
import { useDeleteTag } from "@hooks/tags/useDeleteTag.ts";
import { toastPromise } from "../utils/toast.utils.tsx";
import TagEdit from "@components/Tags/TagEdit.tsx";
import { useUpdateTagName } from "@hooks/tags/useUpdateTagName.ts";
import { useUpdateTagStatus } from "@hooks/tags/useUpdateTagStatus.ts";

const TagsPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const queryTags = useGetAllTags({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const deleteMutation = useDeleteTag({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const updateNameMutation = useUpdateTagName({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const updateStatusMutation = useUpdateTagStatus({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const handleDelete = async (id: string | null) => {
    if (!id) return;
    await toastPromise(deleteMutation.mutateAsync(id), {
      loading: "Deleting tag...",
      success: "Deletion successful",
      error: "Deletion failed",
    });
  };

  const [tagDetailsId, setTagDetailsId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const dataTagDetails = useGetTagDetails(tagDetailsId);

  const [tagEditOpen, setTagEditOpen] = useState(false);

  const changeTagDetails = (id: string) => {
    setTagDetailsId(id);
    setDetailsOpen(true);
  };

  const changeTagEdit = async (id: string | null) => {
    setTagDetailsId(id);
    setTagEditOpen(true);
  };

  const handleSubmitEdit = async (
    id: string,
    name: string,
    isActive: boolean
  ) => {
    if (dataTagDetails.data?.name !== name) {
      console.log("test", isActive);
      await toastPromise(updateNameMutation.mutateAsync({ id, name }), {
        success: "Name updated successfully",
        error: "Failed to update name",
        loading: "Updating name...",
      });
    }

    if (dataTagDetails.data?.isActive !== isActive) {
      await toastPromise(updateStatusMutation.mutateAsync({ id, isActive }), {
        success: "Tag status updated successfully",
        error: "Failed to update tag status",
        loading: "Updating tag status...",
      });
    }
  };

  return (
    <TableLayout>
      <ComponentOrLoader isLoading={queryTags.isLoading} loader={<Loader />}>
        <Tags
          tags={queryTags.data}
          sorting={sorting}
          setSorting={setSorting}
          pagination={pagination}
          setPagination={setPagination}
          onDetails={changeTagDetails}
          onDelete={handleDelete}
          onEdit={changeTagEdit}
        />
      </ComponentOrLoader>
      <ComponentOrLoader
        isLoading={dataTagDetails.isLoading}
        loader={<Loader />}
      >
        <TagDetails
          tag={dataTagDetails.data!}
          open={detailsOpen}
          openChange={setDetailsOpen}
        />
      </ComponentOrLoader>
      <ComponentOrLoader
        isLoading={dataTagDetails.isLoading}
        loader={<Loader />}
      >
        <TagEdit
          tag={dataTagDetails.data!}
          onSubmit={handleSubmitEdit}
          open={tagEditOpen}
          setOpen={setTagEditOpen}
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default TagsPage;
