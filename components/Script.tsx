import useScriptStore from "@/store/useScriptStore";
import adScriptData from "../adScriptData.json";
import { useState } from "react";
import { IoMdLock } from "react-icons/io";

interface AdScript {
  Script_Number: number;
  Pain: {
    On_Screen_Visual: string;
    Voice_Over: string;
    Text_Overlay: string;
  };
  Agitate: {
    On_Screen_Visual: string;
    Voice_Over: string;
    Text_Overlay: string;
  };
  Solve: {
    On_Screen_Visual: string;
    Voice_Over: string;
    Text_Overlay: string;
  };
}

// const Script: React.FC = () => {
// const scriptResponse = useScriptStore((state: any) => state.scriptData);
// const isDataAvailable = Object.keys(scriptResponse).length > 0;

// const jsonData: { Ad_Script: AdScript[] } = adScriptData;
// const headings = Object.keys(jsonData.Ad_Script[0]);

// console.log(scriptResponse)

// if (!isDataAvailable) {
//   return (
//     <div className=" h-fit min-w-max p-2 flex flex-col gap-3 bg-white rounded-md shadow-md">
//       <div className="flex items-center justify-between mx-4">
//         <div className="text-lg font-bold">Script</div>
//         <div className="">|||</div>
//       </div>
//       <hr />
//       <div className="py-8 px-4">
//         Hook are required to generate ad Scripts. Please generate or create{" "}
//         <br />
//         concepts on the left 👈, and generate hooks from a Hook.
//       </div>
//     </div>
//   );
// }
// return (
//   <>
//     <div>
//       <div className=" h-[80vh] overflow-y-scroll min-w-max  p-2 flex flex-col gap-3 bg-white rounded-md shadow-md">
//         <div className="flex items-center justify-between pt-2 mx-4">
//           <div className="text-lg font-bold">Script</div>
//           <div className="border cursor-pointer rounded-lg shadow-md text-white px-3 py-2 bg-[#6938ef]">
//             Generate More
//           </div>
//         </div>
//         <hr />
//         <div className="">
//           {scriptResponse?.Ad_Script?.map(
//             (scriptItem: any, index: number) => {
//               return (
//                 <div
//                   key={index}
//                   className="px-4 bg-gray-100 py-2 rounded-lg mt-2"
//                 >
//                   <div className="flex gap-4 pt-2 items-center text-[#6938ef]">
//                     <span className="font-bold">Script {index + 1}</span>
//                     <span className="border px-2 text-sm py-1 rounded-lg border-[#6938ef] bg-[#d2c2ff]">
//                       Framework: PAS (Pain, Agitate, Solve)
//                     </span>
//                   </div>
//                   <div className="mt-3">
//                     <table className="min-w-full">
//                       <thead>
//                         <tr>
//                           <th className="text-left text-gray-400">
//                             Ad block type
//                           </th>
//                           <th className="text-left text-gray-400">
//                             On-screen visual
//                           </th>
//                           <th className="text-left text-gray-400">
//                             Voice-over
//                           </th>
//                           <th className="text-left text-gray-400">
//                             Text-overlay
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {["Pain", "Agitate", "Solve"].map((type) => (
//                           <tr key={type} className="border-b">
//                             <td className="py-2">{type}</td>
//                             <td>{scriptItem?.Ad_Block_Type}</td>
//                             <td>{scriptItem?.Voice_Over}</td>
//                             <td>{scriptItem[`${type}_Text_Overlay`]}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                   <div className="flex justify-end mt-2">
//                     <div className="cursor-pointer border px-4 py-1 rounded-md bg-[#6938ef] text-white w-fit">
//                       Generate Script
//                     </div>
//                   </div>
//                 </div>
//               );
//             }
//           )}
//         </div>
//       </div>
//     </div>
//   </>
// );
// }

const Script: React.FC = () => {
  const scriptResponse = useScriptStore((state: any) => state.scriptData);
  const isDataAvailable = Object.keys(scriptResponse).length > 0;

  const [adFramework, setAdFramework] = useState(scriptResponse?.Framework);
  console.log(scriptResponse);
  if (!isDataAvailable) {
    return (
      <div className=" h-fit min-w-fit p-2 flex flex-col gap-3 bg-white rounded-md shadow-md">
         <div className="flex items-center justify-between mx-4">
          <div className="text-lg font-bold">Hook</div>
          <div className="text-2xl"><IoMdLock /></div>
        </div>
        <hr />
        <div className="py-8 px-4">
          Hook are required to generate ad Scripts. Please generate or create{" "}
          <br />
          concepts on the left 👈, and generate hooks from a Hook.
        </div>
      </div>
    );
  }
  return (
    <>
      <div>
        {scriptResponse ? (
          <div className="h-[80vh] overflow-y-scroll min-w-32 max-w-3xl p-2 flex flex-col gap-3 bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between pt-2 mx-4">
              <div className="text-lg font-bold">Script</div>
              <div className="cursor-pointer rounded-lg shadow-md text-white px-3 py-2 bg-[#6938ef]">
                Generate More
              </div>
            </div>
            <hr />
            <div>
              {scriptResponse.Ad_Script?.map((script: any, index: any) => (
                <div
                  key={index}
                  className="px-4 bg-gray-100 py-2 rounded-lg mt-2"
                >
                  <div className="flex gap-4 pt-2 items-center text-[#6938ef]">
                    <span className="font-bold">
                      Script {script.Script_Number}
                    </span>
                    <span className="border px-2 text-sm py-1 rounded-lg border-[#6938ef] bg-[#d2c2ff]">
                      Framework: {adFramework}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="w-[40vw]">
                      <div>
                        <div className="flex">
                          <div className=" w-full text-gray-400">
                            Ad block type
                          </div>
                          <div className=" w-full text-gray-400">
                            On-screen visual
                          </div>
                          <div className=" w-full text-gray-400">
                            Voice-over
                          </div>
                          <div className=" w-full text-gray-400">
                            Text-overlay
                          </div>
                        </div>
                      </div>
                      <div>
                        {Object.keys(script)
                          .filter(
                            (key) =>
                              key !== "Script_Number" && key !== "Framework"
                          )
                          .map((type) => (
                            <div
                              key={type}
                              className=" border-b flex items-center my-3 gap-5"
                            >
                              <div className="font-bold w-full">{type}</div>
                              <div className=" w-full">
                                {script[type].On_Screen_Visual}
                              </div>
                              <div className=" w-full">
                                {script[type].Voice_Over}
                              </div>
                              <div className=" w-full">
                                {script[type].Text_Overlay}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Script;
