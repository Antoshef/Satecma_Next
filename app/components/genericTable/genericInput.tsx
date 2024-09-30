import {
  ChangeEvent,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  Dispatch,
  KeyboardEvent
} from 'react';
import { useMergedRef } from '../useMergedRefs/useMergedRefs';
import HintIcon from './hintIcon';

export function itemHandler<T, K extends keyof T>(
  name: string,
  items: Array<{ name?: string }>,
  stateProperty: K,
  handler: Dispatch<SetStateAction<T>>
): void {
  const selected = items.find((item) => item.name === name);
  handler((prevState) => ({
    ...prevState,
    [stateProperty]: selected || {}
  }));
}

export interface GenericInputProps<T> {
  hint?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  data: T[];
  selectedItem: T | null;
  className?: string;
  variant?: 'simple' | 'outlined';
  setSelectedItem: (item: T) => void;
  displayProperty: keyof T;
}

export const GenericInput = forwardRef<unknown, GenericInputProps<any>>(
  (
    {
      hint,
      label,
      placeholder,
      required,
      data,
      selectedItem,
      className,
      variant = 'outlined',
      setSelectedItem,
      displayProperty
    },
    ref
  ) => {
    const [input, setInput] = useState('');
    const [uniqueNames, setUniqueNames] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef<HTMLDivElement>(null);
    const mergedRefs = useMergedRef(ref, inputRef);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);
      if (value.length > 0) {
        const filteredSuggestions = uniqueNames.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setHighlightedIndex(-1);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const selectItem = (name: string) => {
      const selectedItem = data.find((item) => item[displayProperty] === name);
      if (selectedItem) {
        setSelectedItem(selectedItem);
        setSuggestions([]);
        setShowSuggestions(false);
        setInput(name);
        setHighlightedIndex(-1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (showSuggestions) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setHighlightedIndex((prevIndex) =>
            prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setHighlightedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
          );
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
          e.preventDefault();
          selectItem(suggestions[highlightedIndex]);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setShowSuggestions(false);
        }
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (inputRef.current && !inputRef.current.contains(target)) {
          setShowSuggestions(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, [inputRef]);

    useEffect(() => {
      const names = data.reduce((acc: string[], item) => {
        const name = item[displayProperty] as unknown as string;
        if (name && !acc.includes(name)) {
          acc.push(name);
        }
        return acc;
      }, []);

      setUniqueNames(names);
    }, [data, displayProperty]);

    useEffect(() => {
      const name = selectedItem
        ? (selectedItem[displayProperty] as unknown as string)
        : '';
      setInput(name);
    }, [selectedItem, displayProperty]);

    return (
      <div className={`${className} relative inline-block`} ref={mergedRefs}>
        {/* {hint && <HintIcon hint={hint} fieldName={String(displayProperty)} />} */}
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          required={required}
          className={`${variant === 'simple' ? 'w-full border border-gray-300 rounded-md px-1 py-0.5' : 'block w-full p-1 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm'} `}
          autoComplete="off"
          onFocus={() => setShowSuggestions(true)}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-y-auto border border-gray-300">
            <ul className="list-none p-0 m-0">
              {suggestions.map((name, index) => (
                <li
                  key={index}
                  onClick={() => selectItem(name)}
                  className={`p-2 cursor-pointer ${
                    index === highlightedIndex
                      ? 'bg-indigo-600 text-white'
                      : index % 2
                        ? 'bg-white'
                        : 'bg-gray-100'
                  }`}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

GenericInput.displayName = 'GenericInput';
