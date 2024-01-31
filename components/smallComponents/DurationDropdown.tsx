import { useState, useEffect, useRef } from "react";
import { IoIosArrowDropdown } from "react-icons/io";

export default function DurationDropdown({ selected, setSelected }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    "5-15 sec",
    "15-30 sec",
    "30-60 sec",
    "60-90 sec",
    "90-120 sec",
    ">120 sec"
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
      <label
        htmlFor="duration"
        className="block  text-gray-700"
      >
        Video Duration
      </label>
      <button
        id="VideoDuration"
        type="button"
        className="border px-2 py-1 rounded-md w-full flex flex-start"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center w-full justify-between mt-1 ">
          <div className="">{selected}</div>{" "}
          <div className="">
            <IoIosArrowDropdown />
          </div>
        </div>
      </button>

      {isOpen && (
        <ul className='absolute z- 10 bg-white  w-full border rounded-md'>
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
