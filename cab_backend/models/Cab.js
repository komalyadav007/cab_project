// models/Cab.js
const mongoose = require('mongoose');

const CabSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pricePerMinute: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

module.exports = mongoose.model('Cab', CabSchema);
