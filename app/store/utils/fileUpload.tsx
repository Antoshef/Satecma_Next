import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { InvoiceProductData, StoreUnits } from "./types";

interface FileUploadProps {
  data: InvoiceProductData[] | null;
  setData: Dispatch<SetStateAction<InvoiceProductData[] | null>>;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

const FileUpload = ({ data, setData, setOpenDialog }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  useEffect(() => {
    if (file && file.type === "text/plain") {
      const formData = new FormData();
      formData.append("file", file);
      fetch("/api/parse-file", {
        method: "POST",
        body: formData,
      }).then(async (response) => {
        if (response.ok) {
          const { data }: { data: InvoiceProductData[] } =
            await response.json();
          const updatedProducts = data.map((product) => {
            if (product.unit === StoreUnits.pcs) {
              return {
                ...product,
                quantity: product.totalQuantity,
                package: 1,
              };
            }
            return product;
          });
          setData(updatedProducts);
        } else {
          console.error("Error parsing PDF");
        }
      });
    }
  }, [file]);

  useEffect(() => {
    if (!data) {
      setFile(null);
    }
  }, [data]);

  return (
    <div className="flex flex-col">
      {/* Drag and Drop area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 p-5 text-center"
      >
        Drag and drop your file here or click to select a file
      </div>

      {/* File input for clicking and selecting files */}
      <input
        type="file"
        accept="text/plain"
        onChange={handleChange}
        className="hidden" // Hide the default file input
        id="fileInput" // Used to link label
      />
      <label
        htmlFor="fileInput"
        className="block mt-5 text-center cursor-pointer"
      >
        Or click to select a file
      </label>

      {file && (
        <div className="flex justify-evenly mt-5">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setOpenDialog(true)}
          >
            Selected file: {file.name}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
