"use client";
import Concept from "@/components/Concept";
import Context from "@/components/Context";
import Hook from "@/components/Hook";
import Navbar from "@/components/Navbar";
import Script from "@/components/Script";
export default function Main() {
  return (
    <div className="h-[100vh] bg-slate-100">
      <Navbar />
      <div className="flex gap-7 px-16 pt-6 overflow-hidden">
        <Context />
        <Concept />
        <Hook />
        <Script />
      </div>
    </div>
  );
}
