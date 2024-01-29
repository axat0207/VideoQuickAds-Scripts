import { useState, useEffect, useRef } from 'react';

interface MultiSelectInputProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({ options, selected, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle clicks outside the component to hide the dropdown
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSelect = (option: string) => {
    if (!selected.includes(option)) {
      onChange([...selected, option]);
      setIsDropdownVisible(false); // Hide dropdown after selection
    }
  };

  const handleDeselect = (option: string) => {
    onChange(selected.filter((selectedOption) => selectedOption !== option));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const toggleDropdownVisibility = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="flex flex-col" ref={wrapperRef}>
        <div>Plaforms</div>
      <div className="flex flex-wrap">
        {selected.map((option) => (
          <div key={option} className="flex items-center m-1">
            <span className="bg-gray-200 rounded px-2 py-1 text-sm">{option}</span>
            <button
              type="button"
              onClick={() => handleDeselect(option)}
              className="ml-1 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={toggleDropdownVisibility}
          className="border mt-2 rounded-md w-full px-2 py-1"
          placeholder="Add Platforms "
        />
      </div>
      {isDropdownVisible && (
        <div className="z-10 w-full border rounded-md' bg-white mt-1 rounded-md shadow-lg">
          {options
            .filter((option) => !selected.includes(option))
            .map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className="cursor-pointer hover:bg-gray-100 px-2 py-1 border-b"
              >
                {option}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default MultiSelectInput;
