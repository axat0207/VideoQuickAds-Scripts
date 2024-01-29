import { create } from "zustand";

const useHookStore = create((set) => ({
  hookData: {}, // Initial state of conceptData is an empty object

  // Action to update conceptData
  setHookData: (newData: any) => set(() => ({ hookData: newData })),
}));

export default useHookStore;
