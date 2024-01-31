import useConceptStore from "@/store/useConceptStore";
import generateHookAPI from "@/Api/generateHookApi";
import useHookStore from "@/store/useHookStore";
import { useState } from "react";
import Loader from "./smallComponents/Loader";
import { ChevronsUpDown, Plus, X } from "lucide-react";
import { IoMdLock } from "react-icons/io";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Concept() {
  const conceptResponse = useConceptStore((state: any) => state.conceptData);
  const isDataAvailable = Object.keys(conceptResponse).length > 0;
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  
  const [isOpenArray, setIsOpenArray] = useState(Array(conceptResponse?.adConcept?.length).fill(false));

  const toggleCollapsible = (index:any) => {
    const updatedIsOpenArray = isOpenArray.map((value, i) => (i === index ? !value : false));
    setIsOpenArray(updatedIsOpenArray);
  };
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
      setIsLoading(false);
    }
  };
  if (!isDataAvailable) {
    return (
      <div className=" h-fit min-w-96 max-w-3xl p-2 flex flex-col gap-3 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between mx-4">
          <div className="text-lg font-bold">Concept</div>
          <div className="text-2xl"><IoMdLock /></div>
        </div>
        <hr />
        <div className="py-8 px-4">
          Context information is required to generate ad concepts.
          <br />
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
          {conceptResponse?.adConcept?.map(
            (conceptItem: any, index: number) => {
              return (
                <div
                  key={index}
                  className="px-4 bg-gray-100 py-2 rounded-lg mt-2"
                >
                  <Collapsible
                     open={isOpenArray[index]}
                     onOpenChange={() => toggleCollapsible(index)}
                     className="w-[350px] space-y-2"
                  >
                    <div className="flex items-center justify-between space-x-4 px-4">
                      <div className="">
                      <div className="rounded-md py-3  text-sm">
                      <div className="flex gap-4 pt-2 items-center text-[#6938ef]  ">
                        <span className="font-bold">Concept {index + 1}</span>
                        <span className=" px-2 py-1 rounded-lg border-[#6938ef] bg-[#d2c2ff]">
                          2 Hooks. 2 Scripts
                        </span>
                      </div>
                    </div>
                      </div>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-9 p-0">
                          <ChevronsUpDown className="h-4 w-4" />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    
                    <CollapsibleContent className="space-y-2">
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
                        <button
                          onClick={() => {
                            setIsLoading(true);
                            generateHook(conceptItem);
                          }}
                          className={`mt-4 rounded-lg px-3 py-2 shadow-lg w-fit ${
                            isLoading
                              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                              : "bg-[#6938ef] text-white"
                          }`}
                        >
                          <div className="flex gap-2 items-center justify-center">
                            <span>Generate Hook</span>{" "}
                            {isLoading && (
                              <span>
                                <Loader />
                              </span>
                            )}
                          </div>
                        </button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}
