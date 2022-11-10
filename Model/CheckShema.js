const mongoose = require("mongoose");

const CheckShema = new mongoose.Schema({
  name: String,
  isChecked: Boolean,
});

module.exports = CheckShema;
