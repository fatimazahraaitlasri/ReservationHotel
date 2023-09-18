const mongoose = require("mongoose");

const TypeSchema = mongoose.Schema({
  typeName: {
    type: String,
    enum: [
      "Une chambre double",
      "Une chambre triple",
      "Une chambre individuelle",
      "Une suite",
    ],
    required: [true, "Please add a Type field"],
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Type", TypeSchema);
