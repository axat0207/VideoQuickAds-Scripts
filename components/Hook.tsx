import { useState, useEffect } from "react";
import useHookStore from "@/store/useHookStore";
import generateScriptAPI from "@/Api/generateScriptAPI";
import useScriptStore from "@/store/useScriptStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import VideoFrameworkDropdown from "./smallComponents/VideoFrameworkDropdown";

export default function Hook() {
  const [selectedFramework, setSelectedFramework] = useState("PAS");
  const conceptResponse = useHookStore((state: any) => state.hookData);
  const isDataAvailable = Object.keys(conceptResponse).length > 0;
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked && !selectedCheckboxes.includes(name)) {
      setSelectedCheckboxes([...selectedCheckboxes, name]);
    } else if (!checked) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((checkboxName) => checkboxName !== name)
      );
    }
  };
  const generateScript = async (hookItem: any) => {
    const hookObject = {
      Central_Idea: hookItem.Central_Idea,
      Visual_Hook: hookItem.Visual_Hook,
      Voice_Over: hookItem.Voice_Over,
      Text_Overlay: hookItem.Text_Overlay,
      Video_Framework : selectedFramework,
    };

    const jsonResponse = await generateScriptAPI(hookObject);
    if (jsonResponse) {
      const response = JSON.parse(jsonResponse);

      //@ts-ignore
      useScriptStore.getState().setScriptData(response);
    }
  };
  if (!isDataAvailable) {
    return (
      <div className=" h-fit min-w-96 max-w-3xl p-2 flex flex-col gap-3 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between mx-4">
          <div className="text-lg font-bold">Hook</div>
          <div className="">|||</div>
        </div>
        <hr />
        <div className="py-8 px-4">
          Concepts are required to generate ad hooks. Please generate or create{" "}
          <br />
          concepts on the left 👈, and generate hooks from a concept.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=" h-[80vh] overflow-y-scroll min-w-96 max-w-xl p-2 flex flex-col gap-3 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between pt-2 mx-4">
          <div className="text-lg font-bold">Hook</div>
          <div className="border cursor-pointer rounded-lg shadow-md text-white px-3 py-2 bg-[#6938ef]">
            Generate More
          </div>
        </div>
        <hr />
        <div className="">
          {conceptResponse.map((hookItem: any, index: number) => {
            return (
              <div
                key={index}
                className="px-4 bg-gray-100 py-2 rounded-lg mt-2"
              >
                <div className="flex gap-4 pt-2 items-center text-[#6938ef]  ">
                  <span className="font-bold">
                    Hook {index + 1} for concept {index + 1}
                  </span>
                  <span className="border px-2 text-sm py-1 rounded-lg border-[#6938ef] bg-[#d2c2ff]">
                    2 Hooks. 2 Scripts
                  </span>
                </div>
                <div className="flex flex-col gap-3 mt-3">
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-400 ">Central idea</div>
                    <div>{hookItem.Central_Idea}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-400">Visual hook</div>
                    <div>{hookItem.Visual_Hook}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-400 ">Voice-over</div>
                    <div>{hookItem.Voice_Over}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-400 ">Text-overlay</div>
                    <div>{hookItem.Text_Overlay}</div>
                  </div>
                </div>
                <div>
                  <div className="cursor-pointer border px-2 py-1 rounded-md bg-[#6938ef] mt-2 text-white w-fit flex justify-end">
                    <Dialog>
                      <DialogTrigger>
                        <div className="">Generate Script</div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold border-b pb-2">Generate Video Script</DialogTitle>
                          <DialogDescription>
                            <div className="mt-3 flex flex-col gap-4">
                              <VideoFrameworkDropdown
                                selected={selectedFramework}
                                setSelected={setSelectedFramework}
                              />
                              <div>
                                <div className="text-lg font-bold">Scripts Elements : </div>
                                <div className="flex flex-col gap-1">
                                  {[
                                    "Voice-Over",
                                    "Text-Overlay",
                                    "Camera-Angle",
                                    "Emotion",
                                  ].map((name) => (
                                    <label
                                      key={name}
                                      className="inline-flex items-center space-x-2"
                                    >
                                      <input
                                        type="checkbox"
                                        name={name}
                                        checked={selectedCheckboxes.includes(
                                          name
                                        )}
                                        onChange={handleCheckboxChange}
                                        className="form-checkbox"
                                      />
                                      <span>{name}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div>More Requirement</div>
                                <div className="">
                                  <textarea className="w-full border px-2 py-1 rounded-md" />
                                </div>
                              </div>
                              <DialogPrimitive.Close>
                                <div
                                  onClick={() => generateScript(hookItem)}
                                  className="border cursor-pointer rounded-lg w-fit text-white px-3 py-2 bg-[#6938ef]"
                                >
                                  Generate Script
                                </div>
                              </DialogPrimitive.Close>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
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
