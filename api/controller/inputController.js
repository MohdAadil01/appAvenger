const Input = require("../models/Input");

exports.autosaveInput = async (req, res) => {
  try {
    const { inputValue } = req.body;

    // Check if inputValue is empty
    if (!inputValue.trim()) {
      return res.status(400).json({ message: "Input value cannot be empty" });
    }

    const newInput = new Input({ inputValue });
    await newInput.save();
    return res.status(200).json({ message: "Autosave successful" });
  } catch (error) {
    console.error("Autosave error:", error);
    return res.status(500).json({ message: "Autosave failed" });
  }
};
