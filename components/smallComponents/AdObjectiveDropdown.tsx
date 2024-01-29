import { useState, useEffect, useRef } from 'react';

export default function AdObjectiveDropdown({ selected, setSelected } :any) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    'Awareness', 'Traffic', 'Engagement', 'Leads', 'App Promotion'
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  console.log(selected + "ad objective selected in smalll")
  return (
    <div ref={dropdownRef} className="relative">
      <label htmlFor="ad-objective" className="block text-gray-700">
        * Ad Objective
      </label>
      <button
        id="ad-objective"
        type="button"
        className='border px-2 py-1 mt-1 rounded-md w-full flex flex-start'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
      </button>

      {isOpen && (
        <ul className='absolute z- 10 bg-white  w-full border rounded-md'>
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer border-b select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              role="option"
              onClick={() => {
                setSelected(option);  // Update the state in the parent component
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
