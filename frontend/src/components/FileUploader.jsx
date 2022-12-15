import React, { useState } from "react";

const UploadFile = () => {
  const [file, setFile] = useState(null);

  // Event handler for when the user selects a file
  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  // Event handler for when the user submits the form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to store the file
    const formData = new FormData();
    formData.append("file", file);

    // Send the file to the API
    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    }).then(() => {
      alert("File successfully uploaded!");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect} />
      <button type="submit">Upload File</button>
    </form>
  );
};

export default UploadFile;
