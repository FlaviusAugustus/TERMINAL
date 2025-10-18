import clsx from "clsx";

type MobileNavbarProps = {
  open: boolean;
};

const barClasses = "h-[2px] w-5 rounded-full bg-black transition";

const MobileNavbarToggle = ({ open }: MobileNavbarProps) => {
  return (
    <div className="grid justify-items-center gap-[4px]">
      <span
        className={clsx(barClasses, open && "rotate-45 translate-y-[6px]")}
      ></span>
      <span className={clsx(barClasses, open && "scale-x-0")}></span>
      <span
        className={clsx(barClasses, open && "-rotate-45 -translate-y-[6px]")}
      ></span>
    </div>
  );
};

export default MobileNavbarToggle;
