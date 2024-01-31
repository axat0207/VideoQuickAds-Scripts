import useConceptStore from "@/store/useConceptStore";
import generateHookAPI from "@/Api/generateHookApi";
import useHookStore from "@/store/useHookStore";
export default function Concept() {
  const conceptResponse = useConceptStore((state:any) => state.conceptData);
  const isDataAvailable = Object.keys(conceptResponse).length > 0;

  
  const generateHook = async (conceptItem: any) => {
    const conceptObject = {
      concept_name: conceptItem.concept_name,
      core_desire: conceptItem.core_desire,
      solved_problem: conceptItem.solved_problem,
      emotion_to_evoke: conceptItem.emotion_to_evoke,
      angle: conceptItem.angle,
    };
   
    const jsonResponse = await generateHookAPI(conceptObject);
    if (jsonResponse) {
      const response = JSON.parse(jsonResponse);
      //@ts-ignore
      useHookStore.getState().setHookData(response);
      
    }
  };
  if (!isDataAvailable) {
    return (
        <div className=" h-fit min-w-96 max-w-3xl p-2 flex flex-col gap-3 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between mx-4">
          <div className="text-lg font-bold">Concept</div>
          <div className="">|||</div>
        </div>
        <hr />
        <div className="py-8 px-4">
          Context information is required to generate ad concepts. Please fill     <br />

          in the form on the left 👈.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=" h-[80vh] overflow-y-scroll min-w-96 max-w-3xl p-2 flex flex-col gap-3 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between pt-2 mx-4">
          <div className="text-lg font-bold">Concept</div>
          <div className="border cursor-pointer rounded-lg shadow-md text-white px-3 py-2 bg-[#6938ef]">
            Generate More
          </div>
        </div>
        <hr />
        <div className="">
          {conceptResponse?.adConcept?.map((conceptItem: any, index: number) => {
            return (
              <div
                key={index}
                className="px-4 bg-gray-100 py-2 rounded-lg mt-2"
              >
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
                    <div>{conceptItem.core_desire}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-400 ">Solved problem</div>
                    <div>{conceptItem.solved_problem}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-400 ">Emotion to evoke</div>
                    <div>{conceptItem.emotion_to_evoke}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-400 ">Angle</div>
                    <div>{conceptItem.angle}</div>
                  </div>
                </div>
                <div className="w-full">
                  <div
                    onClick={() => generateHook(conceptItem)}
                    className="cursor-pointer border px-2 py-1 rounded-md bg-[#6938ef] mt-2 text-white w-fit flex justify-end"
                  >
                    Generate Hook
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
