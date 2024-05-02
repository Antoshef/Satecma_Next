import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ProductData } from "../../create/invoice/types";

interface InputProps {
  products: ProductData[];
  selectedProduct: ProductData | null;
  className?: string;
  setSelectedProduct: (product: ProductData | null) => void;
}

export const Input = ({
  products,
  selectedProduct,
  className,
  setSelectedProduct,
}: InputProps) => {
  const [input, setInput] = useState("");
  const [uniqueNames, setUniqueNames] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

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

  const selectProduct = (product: ProductData | null) => {
    setSelectedProduct(product);
    setSuggestions([]);
    setShowSuggestions(false);
    setInput(product ? product.name : "");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (inputRef.current && !inputRef.current.contains(target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputRef]);

  useEffect(() => {
    const names = products.reduce((acc: string[], arr) => {
      if (!acc.includes(arr.name)) {
        acc.push(arr.name);
      }
      return acc;
    }, []);

    setUniqueNames(names);
  }, [products]);

  useEffect(() => {
    setInput(selectedProduct ? selectedProduct.name : "");
  }, [selectedProduct]);

  return (
    <div className={className} style={{ position: "relative" }} ref={inputRef}>
      <input
        type="text"
        value={input}
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
            {suggestions.map((product, index) => (
              <li
                key={index}
                onClick={() =>
                  selectProduct(
                    products.find((item) => item.name === product) || null
                  )
                }
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                  backgroundColor: index % 2 ? "white" : "#f6f6f6", // Zebra striping
                }}
              >
                {product}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
