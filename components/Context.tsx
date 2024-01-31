"use client";
import { useEffect, useState } from "react";
import generateConceptAPI from "@/Api/generateConceptAPI"; // Make sure the import matches the export
import useConceptStore from "@/store/useConceptStore";
import AdObjectiveDropdown from "./smallComponents/AdObjectiveDropdown";
import MultiSelectInput from "./smallComponents/MultiSelectPlatform";
import DurationDropdown from "./smallComponents/DurationDropdown";
interface Store {
  setContextData: (data: any) => void;
}
interface ConceptApiResponse {
  concept_name: string;
  core_desire: string[];
  solved_problem: string;
  emotion_to_evoke: string[];
  angle: string;
}
export default function Context() {
  const [selectedAdObjective, setSelectedAdObjective] = useState("Awareness");
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setbrandDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setproductDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);

  const [voiceTone, setVoiceTone] = useState("");
  const [duration, setDuration] = useState("5-15 sec");
  const adContextData = {
    selectedAdObjective,
    brandName,
    brandDescription,
    productName,
    productDescription,
    targetAudience,
    selectedPlatform,
    voiceTone,
    duration,
  };

  // setContextData(adContextData);

  const fetchData = async () => {
    const jsonResponse = await generateConceptAPI(adContextData);
    if (jsonResponse !== null) {
      const response = JSON.parse(jsonResponse) as ConceptApiResponse;
      //@ts-ignore
      useConceptStore.getState().setConceptData(response);
    }
  };

  const updateStore = () => {
     fetchData();
  };

  return (
    <div>
      <div className="h-[80vh] overflow-y-scroll px-6 py-4 min-w-96 max-w-3xl flex flex-col gap-3 bg-white rounded-md shadow-lg ">
        <div className=" text-lg font-bold">Content & Set-up</div>
        <hr />
        <div className="text-sm text-gray-400">
          The more information, the better AI generates results are.
        </div>
        <div>
          <AdObjectiveDropdown
            selected={selectedAdObjective}
            setSelected={setSelectedAdObjective}
          />
        </div>
        <div>
          <div>Brand name</div>
          <input
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full border rounded-lg px-2 py-1 "
            type="text"
          />
        </div>
        <div>
          <div>Brand discription</div>
          <textarea
            onChange={(e) => setbrandDescription(e.target.value)}
            className="w-full border rounded-lg px-2 py-1 "
          ></textarea>
        </div>
        <div>
          <div>Product/Service name</div>
          <input
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border rounded-lg px-2 py-1 "
            type="text"
          />
        </div>
        <div>
          <div>Product/Service discription</div>
          <textarea
            onChange={(e) => setproductDescription(e.target.value)}
            className="w-full border rounded-lg px-2 py-1 "
          ></textarea>
        </div>
        <div>
          <div>Target audience</div>
          <textarea
            onChange={(e) => setTargetAudience(e.target.value)}
            className="w-full border rounded-lg px-2 py-1 "
          ></textarea>
        </div>
        <div>
          <div>Tone of voice</div>
          <input
            onChange={(e) => setVoiceTone(e.target.value)}
            className="w-full border rounded-lg px-2 py-1 "
            type="text"
          />
        </div>
        <MultiSelectInput
          options={["Facebook", "Instagram", "TikTok", "Linkedin", "Youtube"]}
          selected={selectedPlatform}
          onChange={setSelectedPlatform}
        />
        <div>
          <DurationDropdown selected={duration} setSelected={setDuration} />
          <div className="">
            <hr />
            <button
              onClick={updateStore}
              className=" mt-4 rounded-lg bg-[#6938ef] px-3 py-2 shadow-lg text-white w-fit "
            >
              Save & Generate Concept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
