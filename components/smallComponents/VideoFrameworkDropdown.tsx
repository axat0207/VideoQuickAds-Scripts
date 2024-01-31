import { useState, useEffect, useRef } from "react";

export default function VideoFrameworkDropdown({ selected, setSelected }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    "AIDA (Attention, Interest, Desire, Action)",
    "PAS (Pain, Agitate, Solve)",
    "FAB (Features, Advantages, Benefits)",
    "USP (Unique Selling Proposition)",
    "EMPATH (Engage, Motivate, Promote, Acknowledge, Tailor, Highlight)",
    "SEP (Story, Emotion, Point)",
    "4Ps (Picture, Promise, Proof, Push)",
    "BAB (Before-After-Bridge)",
    "PAPA (Problem, Agitate, Persuade, Asks)",
    "4Us (Useful, Urgent, Unique, Ultra-specific)",
    "EPIC (Educate, Promote, Inform, Convert)",
    "PSB (Problem-Solution-Benefit)",
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  console.log(selected + " : seconds");
  return (
    <div ref={dropdownRef} className="relative">
      <label htmlFor="duration" className="block text-lg font-bold mb-2  text-gray-700">
        Video Framework
      </label>
      <button
        id="VideoDuration"
        type="button"
        className="border px-2 py-1 rounded-md w-full flex flex-start"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
      </button>

      {isOpen && (
        <ul className="absolute z- 10 bg-white h-fit overflow-y-scroll mb-10 w-full border rounded-md">
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer border-b select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              role="option"
              onClick={() => {
                setSelected(option); // Update the state in the parent component
                setIsOpen(false);
              }}
              aria-selected={selected === option}
            >
              <span className="ml-3  block truncate font-normal">{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
