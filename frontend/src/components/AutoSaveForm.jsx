import React, { useState, useEffect } from "react";
import axios from "axios";

const AutosaveForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [autosaveMessage, setAutosaveMessage] = useState("");
  const [lastSavedValue, setLastSavedValue] = useState("");

  useEffect(() => {
    const autosaveTimer = setInterval(() => {
      if (inputValue.trim() && inputValue !== lastSavedValue) {
        saveInput();
      }
    }, 3000);

    return () => clearInterval(autosaveTimer);
  }, [inputValue, lastSavedValue]);

  const handleInputChange = (e) => {
    setAutosaveMessage(null);
    setInputValue(e.target.value);
  };

  const saveInput = () => {
    axios
      .post("http://localhost:4000/api/autosave", { inputValue })
      .then((response) => {
        setAutosaveMessage("Autosaved successfully");
        setLastSavedValue(inputValue);
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a non-200 status
          setAutosaveMessage(`Server error: ${error.response.data.message}`);
        } else if (error.request) {
          // No response received
          setAutosaveMessage("Network error: Please check your connection");
        } else {
          // Something else went wrong
          setAutosaveMessage("An error occurred while autosaving");
        }
        console.error("Autosave error:", error);
      });
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="max-w-md mx-auto p-6 bg-gray-800 text-white shadow-md rounded-md w-[38rem]">
        <h1 className="text-2xl font-semibold mb-4">Autosave Example</h1>
        <label htmlFor="inputField" className="block mb-2">
          Input:
        </label>
        <input
          type="text"
          id="inputField"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
        />
        <p className="mt-2 text-sm text-gray-300">{autosaveMessage}</p>
      </div>
    </div>
  );
};

export default AutosaveForm;
