const mongoose = require("mongoose");

const inputSchema = new mongoose.Schema({
  inputValue: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Input = mongoose.model("Input", inputSchema);

module.exports = Input;
