// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  cab: { type: mongoose.Schema.Types.ObjectId, ref: 'Cab', required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);
