import {DialogComp} from "@components/Shared/DialogComp.tsx";


export interface TagDetailsProps {
    // parameter: AllParameters | undefined;
    open: boolean;
    openChange: (arg0: boolean) => void;
}

const TagDetails = ({open, openChange}: TagDetailsProps) => {
    return (
      <DialogComp
        isOpen={open}
        setIsOpen={openChange}
        title="Parameter details"
        className="w-full lg:w-[700px]"
      >
          <div className="space-y-3 font-light text-sm text-gray-600">
              <div className="grid grid-cols-3 gap-3">
                  {/*<Detail label="name">{parameter?.name}</Detail>*/}
                  {/*{(parameter?.$type === "decimal" || parameter?.$type === "integer") && (*/}
                  {/*  <>*/}
                  {/*      <Detail label="step">{parameter?.step}</Detail>*/}
                  {/*      <Detail label="unit">{parameter?.unit}</Detail>*/}
                  {/*  </>*/}
                  {/*)}*/}
              </div>
          </div>
      </DialogComp>
    );
};

export default TagDetails;