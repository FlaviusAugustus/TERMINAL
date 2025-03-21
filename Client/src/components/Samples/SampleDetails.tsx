import {UseQueryResult} from "@tanstack/react-query";
import {SampleDetailsDto} from "@api/terminalSchemas.ts";


export interface SampleDetailsProps {
  dataQuery: UseQueryResult<SampleDetailsDto, Error>;
}

const SampleDetails = (props: SampleDetailsProps) => {

    const date = new Date (props.dataQuery.data?.createdAtUtc ?? "");

  if (props.dataQuery.isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );

  return (
    <div className="card-body">
      <div className="card-title text-4xl">Details</div>
      <div className="divider"></div>
      <div className="text-3xl mb-3">Sample Code: {props.dataQuery.data?.code}</div>
    <div className="grid grid-cols-[25%_75%] gap-y-3">
      <div className="font-bold">Created:</div>
      <div>
        {`
            ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}
            ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
        `}
      </div>
      <div className="font-bold flex items-center">Tags:</div>
      <div>
          {props.dataQuery.data?.tags?.map((tag) =>
              (<div key={tag.id} className="badge badge-lg hover:cursor-default p-3 rounded-2xl mr-1 my-1">{tag.name}</div>)
          )}
      </div>
      <div className="font-bold">Comment:</div>
      <div>{props.dataQuery.data?.comment}</div>
      <div className="font-bold">Number of steps: </div>
      <div>{props.dataQuery.data?.steps?.length}</div>
    </div>
    </div>
  );
};

export default SampleDetails;
