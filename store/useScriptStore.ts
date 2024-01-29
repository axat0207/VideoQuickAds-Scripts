import { create } from "zustand";

const useScriptStore = create((set) => ({
  scriptData: {}, // Initial state of conceptData is an empty object

  // Action to update conceptData
  setScriptData: (newData: any) => set(() => ({ scriptData: newData })),
}));

export default useScriptStore;
