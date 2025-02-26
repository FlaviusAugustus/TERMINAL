import { SampleDetailsDto, SampleDto } from "../api/terminalSchemas";
import { useState } from "react";

import SamplesTable from "../components/Samples/Samples";
import SampleDetails from "../components/Samples/SampleDetails";

const samplesData: SampleDto[] = Array.from({ length: 100 }, (_, i) => ({
  code: `AS${i + 1}`,
  projectName: "TEST",
  createdAt: new Date(2021, 8, i + 1), // Wrzesień 2021
}));

const SamplesPage = () => {
  const [sampleDetails, setSampleDetails] = useState<SampleDetailsDto | null>({
    ...samplesData[0],
    comment: "This is a test comment",
    steps: [],
    tags: ["newsample, high-pressure"],
  });

  const changeSampleDetails = (code: string) => {
    const foundSample = samplesData.find((sample) => sample.code === code);
    if (foundSample) {
      setSampleDetails({
        ...foundSample,
        comment: "Default comment",
        steps: [],
        tags: [],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center p-5">
        <div className="flex-1 bg-white p-3 rounded-md m-1">
          <SamplesTable onChangeSampleDetails={changeSampleDetails} />
        </div>
        <div className="flex-1 bg-white p-3 rounded-md m-1 self-start">
          <SampleDetails sampleDetails={sampleDetails} />
        </div>
      </div>
    </div>
  );
};

export default SamplesPage;
