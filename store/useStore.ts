// store.js
import { create } from "zustand";

const useStore = create((set) => ({
  adObjective: "",
  brandName: "",
  brandDiscription: "",
  productName: "",
  productDiscription: "",
  targetAudience : "",
  voiceTone : "",
  platform: [],
  duration: "",
  setContextData: (data: any) => set(data),
}));

export default useStore;
