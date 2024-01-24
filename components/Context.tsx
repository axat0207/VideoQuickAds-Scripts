"use client";
import { useEffect, useState } from "react";
import useStore from '@/store/useStore';
interface Store {
  setContextData: (data: any) => void;
  // define other properties and methods as needed
}
export default function Context() {
  //   const [adObjective, setAdobjective] = useState([]);

  const { setContextData } = useStore() as Store;

  const [brandName, setBrandName] = useState("");
  const [brandDiscription, setBrandDiscription] = useState("");
  const [productName, setProductName] = useState("");
  const [productDiscription, setproductDiscription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [platform, setPlatform] = useState([]);
  const [voiceTone, setVoiceTone] = useState("");
  const [duration, setDuration] = useState("");
  const adContextData = {brandName, brandDiscription, productName, productDiscription, targetAudience, platform, voiceTone, duration  }
  setContextData(adContextData);
  console.log("this is adcontext data : "+ adContextData)
  return (
    <div>
      <div className="px-6 py-4 w-96 flex flex-col gap-3 bg-white rounded-md shadow-lg h-[80vh] overflow-y-scroll">
        <div className=" text-lg font-bold">Content & Set-up</div>
        <hr />
        <div className="text-sm text-gray-400">
          The more information, the better AI generates results are.
        </div>
        <div>
          <div>Ad Objective</div>
          <input className="w-full border rounded-lg px-2 py-1 " type="text" />
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
            onChange={(e) => setBrandDiscription(e.target.value)}
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
            onChange={(e) => setproductDiscription(e.target.value)}
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
        <div>
          <div>Platform</div>
          <input
            //   onChange={(e)=>setPlatform(e.target.value)}
            className="w-full border rounded-lg px-2 py-1 "
            type="text"
          />
        </div>
        <div>
          <div>Video Duration</div>
          <input
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border rounded-lg px-2 py-1 "
            type="text"
          />
        </div>
        <div className="">
          <hr />
          <button className=" mt-4 rounded-lg bg-[#6938ef] px-3 py-2 shadow-lg text-white w-fit ">
            Save & Generate Concept
          </button>
        </div>
      </div>
    </div>
  );
}
