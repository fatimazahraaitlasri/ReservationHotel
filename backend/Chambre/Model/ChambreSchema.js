const mongoose = require("mongoose");
const ChambreSchema = mongoose.Schema({
  capacity: {
    type: String,
    required: [true, "Please add a capacity field"],
  },
  num: {
    type: String,
    required: [true, "Please add a num field"],
  },
  testImage: {
    data: Buffer,
    contentType: String,
  },
  Type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    required: true,
  },
});
module.exports = mongoose.model("Chambre", ChambreSchema);
