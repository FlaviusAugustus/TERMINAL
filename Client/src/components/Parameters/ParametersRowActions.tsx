import IconButton from "@components/Shared/IconButton.tsx";
import {EllipsisHorizontalIcon, XMarkIcon} from "@heroicons/react/24/outline";
import VisibleForRoles from "@components/Shared/VisibleForRoles.tsx";

type ParametersRowActions = {
    onEdit: () => void;
    onDelete: () => void;
};
const ParametersRowActions = ({onEdit, onDelete}: ParametersRowActions) => {
    return (
        <div className="flex gap-1">
            <IconButton
                onClick={onEdit}
                className="hover:bg-gray-100 hover:border-blue-200"
            >
                <EllipsisHorizontalIcon className="h-4 rounded-md" />
            </IconButton>
            <VisibleForRoles roles={["Administrator", "Moderator"]}>
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

export default ParametersRowActions;