import { create } from "zustand";

const useConceptStore = create((set) => ({
  conceptData: {}, // Initial state of conceptData is an empty object

  // Action to update conceptData
  setConceptData: (newData: any) => set(() => ({ conceptData: newData })),
}));

export default useConceptStore;
