import Chip from "./Chip";

type ChipSetProps = {
  values: string[];
};

const ChipSet = ({ values }: ChipSetProps) => {
  return (
    <div className="flex gap-1">
      {values.map((tag) => (
        <Chip key={tag} value={tag} className="text-xs" />
      ))}
    </div>
  );
};

export default ChipSet;
