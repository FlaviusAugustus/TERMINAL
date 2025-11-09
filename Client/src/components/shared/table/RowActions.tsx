import IconButton from "@components/shared/common/IconButton.tsx";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import VisibleForRoles from "@components/shared/common/VisibleForRoles.tsx";

type RowActionsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  onDetails?: () => void;
  disabled: boolean;
};

const RowActions = ({
  onEdit,
  onDetails,
  onDelete,
  disabled = false,
}: RowActionsProps) => {
  return (
    <div className="flex gap-1">
      {onDetails && (
        <IconButton
          onClick={onDetails}
          disabled={disabled}
          className="hover:bg-gray-100 hover:border-blue-200"
        >
          <MagnifyingGlassIcon className="h-4 rounded-md" />
        </IconButton>
      )}
      <VisibleForRoles roles={["Administrator", "Moderator"]}>
        {onEdit && (
          <IconButton
            onClick={onEdit}
            disabled={disabled}
            className="hover:bg-gray-100 hover:border-blue-200"
          >
            <PencilIcon className="h-4 rounded-md" />
          </IconButton>
        )}
        {onDelete && (
          <IconButton
            onClick={onDelete}
            disabled={disabled}
            className="hover:bg-gray-100 hover:border-red-200"
          >
            <XMarkIcon className="h-4 rounded-md" />
          </IconButton>
        )}
      </VisibleForRoles>
    </div>
  );
};

export default RowActions;
