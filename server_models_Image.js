const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  unique_id: { type: String, required: true },
  file_name: { type: String, required: true },
  file_path: { type: String, required: true },
  file_size: { type: String },
  file_extension: { type: String },
  dimensions: { type: String },
  exif: { type: Object },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);