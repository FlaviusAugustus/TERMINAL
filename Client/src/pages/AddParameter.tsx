import NewParameterForm from "@components/addParameter/NewParameterForm.tsx";

const AddParameter = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="rounded-md bg-white p-4 w-[25rem] border shadow-sm">
        <div className="flex justify-between items-center w-full pb-5">
          <p className="font-medium text-lg">Add new parameter</p>
        </div>
        <NewParameterForm />
      </div>
    </div>
  );
};

export default AddParameter;
