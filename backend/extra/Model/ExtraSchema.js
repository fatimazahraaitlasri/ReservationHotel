const {mongoose} = require("mongoose");

const ExtraSchema = mongoose.Schema({
    name: {
        type: String,
        enum: ["petit déjeuner", "déjeuner", "dîner", "fruits", "musique", "spa", "massage", "soin", "excursion"],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Extra", ExtraSchema);
