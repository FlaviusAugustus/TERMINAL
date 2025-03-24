import {SampleDetailsDto} from "@api/terminalSchemas.ts";


export interface SampleDetailsProps {
  dataQuery: SampleDetailsDto | undefined;
}

const SampleDetails = (props: SampleDetailsProps) => {

    const date = new Date (props.dataQuery?.createdAtUtc ?? "");



  return (
    <div className="card-body">
      <div className="card-title text-4xl">Details</div>
      <div className="divider"></div>
      <div className="text-3xl mb-3">Sample Code: {props.dataQuery?.code}</div>
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
          {props.dataQuery?.tags?.map((tag) =>
              (<div key={tag.id} className="badge badge-lg hover:cursor-default p-3 rounded-2xl mr-1 my-1">{tag.name}</div>)
          )}
      </div>
      <div className="font-bold">Comment:</div>
      <div>{props.dataQuery?.comment}</div>
      <div className="font-bold">Number of steps: </div>
      <div>{props.dataQuery?.steps?.length}</div>
    </div>
    </div>
  );
};

export default SampleDetails;
