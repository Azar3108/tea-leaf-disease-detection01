import React, { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState(null); // Store the image preview
  const [result, setResult] = useState(""); // Store the result from the server
  const [loading, setLoading] = useState(false); // Show a loading spinner

  // Function to handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  // Function to submit the image to the back-end
  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true); // Show loading
    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');
    formData.append("file", fileInput.files[0]); // Attach the file

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result); // Show the result from the back-end
      } else {
        alert("Error analyzing the image. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false); // Hide loading
    }
  };

  return (
    <div className="p-6 flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Tea Leaf Disease Detection</h1>

      {/* Image Upload Input */}
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {/* Image Preview */}
      {image && (
        <div className="mt-4">
          <h2 className="text-lg">Preview:</h2>
          <img
            src={image}
            alt="Uploaded"
            className="w-64 h-64 object-cover border rounded-lg"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Submit"}
      </button>

      {/* Result */}
      {result && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
          <h2 className="text-lg font-semibold">Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
