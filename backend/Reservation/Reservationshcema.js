const mongoose = require("mongoose");

const ReservationSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  roomId: {
    // Id de la chambre réservée
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chambre",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  extras: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Extra",
    },
  ],

  totalAmount: {
    // montant total de la réservation
    type: Number,
    // required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["paypal", "stripe", "sur place"],
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
