import {
  ChangeEvent,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  Dispatch,
} from "react";
import { useMergedRef } from "../useMergedRefs/useMergedRefs";

export function itemHandler<T, K extends keyof T>(
  name: string,
  items: Array<{ name?: string }>,
  stateProperty: K,
  handler: Dispatch<SetStateAction<T>>,
): void {
  const selected = items.find((item) => item.name === name);
  handler((prevState) => ({
    ...prevState,
    [stateProperty]: selected || {},
  }));
}

export interface InputProps {
  label?: string;
  required?: boolean;
  data: { name?: string }[];
  selectedItem: { name?: string } | null;
  className?: string;
  size?: "small" | "medium";
  setSelectedItem: (name: string) => void;
}

export const Input = forwardRef<{}, InputProps>(
  (
    { label, required, data, selectedItem, className, size, setSelectedItem },
    ref,
  ) => {
    const [input, setInput] = useState("");
    const [uniqueNames, setUniqueNames] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);
    const mergedRefs = useMergedRef(ref, inputRef);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);
      if (value.length > 0) {
        const filteredSuggestions = uniqueNames.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase()),
        );
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const selectItem = (name: string) => {
      setSelectedItem(name);
      setSuggestions([]);
      setShowSuggestions(false);
      setInput(name);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (inputRef.current && !inputRef.current.contains(target)) {
          setShowSuggestions(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [inputRef]);

    useEffect(() => {
      const names = data.reduce((acc: string[], arr) => {
        if (arr.name && !acc.includes(arr.name)) {
          acc.push(arr?.name);
        }
        return acc;
      }, []);

      setUniqueNames(names);
    }, [data]);

    useEffect(() => {
      setInput(selectedItem?.name ? selectedItem.name : "");
    }, [selectedItem]);

    return (
      <div
        className={className}
        style={{ position: "relative" }}
        ref={mergedRefs}
      >
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type="text"
          value={input}
          required={required}
          className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            size === "small" ? "text-sm" : "text-base"
          }`}
          autoComplete="off"
          onFocus={() => setShowSuggestions(true)}
          onChange={onChange}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-y-auto border border-gray-300">
            <ul className="list-none p-0 m-0">
              {suggestions.map((name, index) => (
                <li
                  key={index}
                  onClick={() =>
                    selectItem(
                      data.find((item) => item.name === name)?.name || "",
                    )
                  }
                  className={`p-2 cursor-pointer ${
                    index % 2 ? "bg-white" : "bg-gray-100"
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
  },
);

Input.displayName = "Input";
