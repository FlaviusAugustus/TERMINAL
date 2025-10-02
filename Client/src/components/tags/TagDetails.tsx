import { DialogComp } from "@components/shared/dialog/DialogComp.tsx";
import { TagDetailsDto } from "@api/models/Tag.ts";
import Detail from "@components/shared/common/Detail.tsx";
import { Color } from "@utils/colorUtils.tsx";
import Chip from "@components/shared/common/Chip.tsx";

export interface TagDetailsProps {
  tag: TagDetailsDto | undefined;
  open: boolean;
  openChange: (arg0: boolean) => void;
}

function getChipColors(isActive: boolean): Color {
  return isActive ? "green" : "red";
}

function getChipValue(isActive: boolean): string {
  return isActive ? "Active" : "Not Active";
}

const TagDetails = ({ tag, open, openChange }: TagDetailsProps) => {
  return (
    <DialogComp
      isOpen={open}
      setIsOpen={openChange}
      title="Tag details"
      className="w-full lg:w-[700px]"
    >
      <div className="space-y-3 font-light text-sm text-gray-600">
        <div className="grid grid-cols-2 gap-3">
          <Detail label="name">{tag?.name}</Detail>
          <Detail label="name">
            <Chip
              value={getChipValue(tag?.isActive || false)}
              getColorValue={() => getChipColors(tag?.isActive || false)}
            />
          </Detail>
        </div>
      </div>
    </DialogComp>
  );
};

export default TagDetails;
