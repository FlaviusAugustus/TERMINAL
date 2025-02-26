import { SampleDetailsDto } from "../../api/terminalSchemas";

export interface SampleDetailsProps {
  sampleDetails: SampleDetailsDto | null;
}

const SampleDetails = (props: SampleDetailsProps) => {
  return (
    <div className="card-body">
      <h2 className="card-title">Details</h2>
      <br />
      Sample Code: {props.sampleDetails?.code}
      <br />
      Created: {props.sampleDetails?.createdAt?.toLocaleDateString()}
      <br />
      Tags: {props.sampleDetails?.tags?.join(", ")}
      <br />
      Comment: {props.sampleDetails?.comment}
      <br />
      Number of steps: {props.sampleDetails?.steps?.length}
      <br />
    </div>
  );
};

export default SampleDetails;
