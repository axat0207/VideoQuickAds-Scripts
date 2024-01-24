import { useState, useEffect } from "react";
import gptResponse from "@/Api/GptApiResponse"; // Make sure the import matches the export

export default function Concept() {
  // Adjust the type to match the expected structure of your API response
  const [apiResponse, setApiResponse] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const jsonResponse = await gptResponse(); // Correctly invoking the function here
      console.log(jsonResponse);
      if (jsonResponse !== null) {
        const response = JSON.parse(jsonResponse);
        setApiResponse(response);
      }
    };

    fetchData();
  }, []);

  // You should handle the case where apiResponse is null to avoid trying to access properties of null
  if (!apiResponse) {
    return (
      <div className=" h-fit w-96 p-2 flex flex-col gap-3 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between mx-4">
          <div className="text-lg font-bold">Concept</div>
          <div className="">|||</div>
        </div>
        <hr />
        <div className="py-8 px-4">
          Context information is required to generate ad concepts. Please fill
          in the form on the left 👈.
        </div>
      </div>
    ); // Or any other loading state you prefer
  }

  return (
    <>
      <div className=" h-[80vh] overflow-y-scroll w-96 p-2 flex flex-col gap-3 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between pt-2 mx-4">
          <div className="text-lg font-bold">Concept</div>
          <div className="border cursor-pointer rounded-lg shadow-md text-white px-3 py-2 bg-[#6938ef]">
            Generate More
          </div>
        </div>
        <hr />
        <div className="">
          {apiResponse.adConcept.map((conceptItem: any, index: number) => {
            return (
              <div key={index} className="px-4 bg-gray-100 py-2 rounded-lg mt-2">
                <div className="flex gap-4 pt-2 items-center text-[#6938ef]  ">
                  <span className="font-bold">Concept {index + 1}</span>
                  <span className="border px-2 text-sm py-1 rounded-lg border-[#6938ef] bg-[#d2c2ff]">
                    2 Hooks. 2 Scripts
                  </span>
                </div>
                <div className="flex flex-col gap-3 mt-3">
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-400 ">Concept Name</div>
                    <div>{conceptItem.concept_name}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-400">Core desire</div>
                    <div>{conceptItem.concept_name}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-400 ">Solved problem</div>
                    <div>{conceptItem.solved_problem}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-400 ">Emotion to evoke</div>
                    <div>{conceptItem.concept_name}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-400 ">Angle</div>
                    <div>{conceptItem.angle}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
