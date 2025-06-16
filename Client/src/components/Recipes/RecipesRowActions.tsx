import IconButton from "@components/Shared/IconButton";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import VisibleForRoles from "@components/Shared/VisibleForRoles.tsx";

type RecipesRowActions = {
  onEdit: () => void;
  onDelete: () => void;
  onDetails: () => void;
};

const RecipesRowActions = ({
  onEdit,
  onDelete,
  onDetails,
}: RecipesRowActions) => {
  return (
    <div className="flex gap-1">
      <IconButton
        onClick={onDetails}
        className="hover:bg-gray-100 hover:border-blue-200"
      >
        <EllipsisHorizontalIcon className="h-4 rounded-md" />
      </IconButton>
      <VisibleForRoles roles={["Administrator", "Moderator"]}>
        <IconButton
          onClick={onEdit}
          className="hover:bg-gray-100 hover:border-blue-200"
        >
          <PencilIcon className="h-4 rounded-md" />
        </IconButton>
        <IconButton
          onClick={onDelete}
          className="hover:bg-gray-100 hover:border-red-200"
        >
          <XMarkIcon className="h-4 rounded-md" />
        </IconButton>
      </VisibleForRoles>
    </div>
  );
};

export default RecipesRowActions;
