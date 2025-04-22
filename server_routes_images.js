const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const exifParser = require('exif-parser');
const Image = require('../models/Image');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join(__dirname, '../Uploads/images', req.body.directory || '');
    await fs.mkdir(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Upload image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    // Extract EXIF data
    const buffer = await fs.readFile(req.file.path);
    const parser = exifParser.create(buffer);
    const exif = parser.parse();

    const image = new Image({
      unique_id: req.file.originalname.replace(/\.[^/.]+$/, ''),
      file_name: req.file.originalname,
      file_path: req.file.path,
      file_size: `${(req.file.size / 1024 / 1024).toFixed(2)} MB`,
      file_extension: req.file.originalname.split('.').pop().toLowerCase(),
      dimensions: `${exif.imageSize.width}x${exif.imageSize.height}`,
      exif: exif.tags
    });

    await image.save();

    res.json({
      image_id: image._id,
      url: `/uploads/images/${req.body.directory || ''}/${req.file.originalname}`,
      exif: exif.tags
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;