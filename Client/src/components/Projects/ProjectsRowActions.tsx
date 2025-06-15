import IconButton from "@components/Shared/IconButton";
import { PencilIcon, XMarkIcon} from "@heroicons/react/24/outline";
import VisibleForRoles from "@components/Shared/VisibleForRoles.tsx";

type ProjectsRowActions = {
  onEdit: () => void;
  onDelete: () => void;
};
const ProjectsRowActions = ({ onEdit, onDelete }: ProjectsRowActions) => {
  return (
    <div className="flex gap-1">
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
      <div className="m-4" />
    </div>
  );
};

export default ProjectsRowActions;
