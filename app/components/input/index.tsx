import {
  ChangeEvent,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  Dispatch,
} from "react";
import { TextField, TextFieldVariants } from "@mui/material";
import { useMergedRef } from "../useMergedRefs/useMergedRefs";

export function itemHandler<T, K extends keyof T>(
  name: string,
  items: Array<{ name?: string }>,
  stateProperty: K,
  handler: Dispatch<SetStateAction<T>>
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
  variant?: TextFieldVariants;
  size?: "small" | "medium";
  setSelectedItem: (name: string) => void;
}

export const Input = forwardRef<{}, InputProps>(
  (
    {
      label,
      required,
      data,
      selectedItem,
      className,
      size,
      variant,
      setSelectedItem,
    },
    ref
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
          item.toLowerCase().includes(value.toLowerCase())
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
        <TextField
          label={label}
          type="text"
          value={input}
          required={required}
          size={size}
          variant={variant}
          autoComplete="off"
          className="input-field"
          onFocus={() => setShowSuggestions(true)}
          onChange={onChange}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div
            style={{
              position: "absolute",
              zIndex: "100",
              width: "100%", // Ensure the dropdown width matches the input field
              backgroundColor: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              maxHeight: "300px",
              overflowY: "auto", // Scroll for long lists
              border: "1px solid #ddd",
              borderTopWidth: "0",
            }}
          >
            <ul
              style={{
                listStyleType: "none",
                padding: "0",
                margin: "0",
              }}
            >
              {suggestions.map((name, index) => (
                <li
                  key={index}
                  onClick={() =>
                    selectItem(
                      data.find((item) => item.name === name)?.name || ""
                    )
                  }
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ddd",
                    backgroundColor: index % 2 ? "white" : "#f6f6f6", // Zebra striping
                  }}
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
