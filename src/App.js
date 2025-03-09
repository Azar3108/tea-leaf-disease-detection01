import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";


const TeaLeafDiseaseDetection = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a dataset file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      } else {
        alert("Error analyzing dataset. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center space-y-4">
      <Card className="w-full max-w-lg">
        <CardContent>
          <h1 className="text-xl font-bold mb-4">Tea Leaf Disease Detection</h1>
          <Input type="file" accept="image/*" onChange={handleFileChange} />

          <Button
            onClick={handleSubmit}
            className="mt-4"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Submit Dataset"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="w-full max-w-lg mt-4">
          <CardContent>
            <h2 className="text-lg font-semibold">Analysis Result:</h2>
            <p className="text-gray-700 mt-2">{result}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeaLeafDiseaseDetection;
