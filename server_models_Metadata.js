const mongoose = require('mongoose');

const metadataSchema = new mongoose.Schema({
  image_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
  unique_id: { type: String, required: true },
  data: {
    landmarks: { type: Object },
    clothes_colour: [String],
    background_colour: [String],
    skin_tone: [String],
    camera: {
      file_name: String,
      file_extension: String,
      file_size: String,
      dimensions: String,
      comments: String,
      date: String,
      camera_maker: String,
      model: String,
      f_stop: String,
      exposure_time: String,
      iso_speed: String,
      exposure_bias: String,
      focal_length: String,
      max_aperture: String,
      metering_mode: String,
      flash_mode: String,
      focal_length_35mm: String
    },
    personal: {
      name: String,
      age_days: Number,
      height_cm: Number,
      weight_kg: Number
    },
    location: {
      city: [String],
      latitude_longitude: String
    },
    face_details: {
      expression: String,
      skin_condition: String,
      wrinkles: String
    },
    appearance: {
      hair_color: String,
      beard_length_mm: String,
      clothes: [String]
    },
    environment: {
      lighting: String,
      uv_index: Number,
      aqi: Number,
      humidity_percent: Number
    },
    lifestyle: {
      sleep: Number,
      exercise: Number
    },
    health_metrics: {
      medications: [String],
      skincare: [String]
    },
    additional: {
      life_events: [String],
      tags: [String]
    },
    image_source: String
  },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Metadata', metadataSchema);