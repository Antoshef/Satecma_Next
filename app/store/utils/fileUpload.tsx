import { Button, Grid } from "@mui/material";
import { ChangeEvent, DragEvent, useEffect, useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
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
      fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      }).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          console.log(data, "DATA");
        } else {
          console.error("Error parsing PDF");
        }
      });
    }
  }, [file]);

  return (
    <Grid container direction="column">
      {/* Drag and Drop area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
        }}
      >
        Drag and drop your file here or click to select a file
      </div>

      {/* File input for clicking and selecting files */}
      <input
        type="file"
        accept="text/plain"
        onChange={handleChange}
        style={{ display: "none" }} // Hide the default file input
        id="fileInput" // Used to link label
      />
      <label
        htmlFor="fileInput"
        style={{
          display: "block",
          marginTop: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        Or click to select a file
      </label>

      <Grid container spacing={2} marginTop={2} justifyContent="space-evenly">
        {file && <p>File selected: {file.name}</p>}
        <Button
          variant="contained"
          color="primary"
          disabled={!file}
          onClick={() => {
            // Handle file upload
          }}
        >
          Upload
        </Button>
      </Grid>
    </Grid>
  );
};

export default FileUpload;