import IconButton from "@components/shared/common/IconButton.tsx";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import VisibleForRoles from "@components/shared/common/VisibleForRoles.tsx";

type UsersRowActions = {
  onEdit: () => void;
  onDelete: () => void;
};
const UsersRowActions = ({ onEdit, onDelete }: UsersRowActions) => {
  return (
    <div className="flex gap-1">
      <VisibleForRoles roles={["Administrator"]}>
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

export default UsersRowActions;
