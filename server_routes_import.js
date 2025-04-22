const express = require('express');
const multer = require('multer');
const Metadata = require('../models/Metadata');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Import JSON
router.post('/json', upload.single('json'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No JSON file uploaded' });
    }

    const jsonData = JSON.parse(req.file.buffer.toString());
    const metadata = await Metadata.findOne({ unique_id: jsonData.unique_id });
    if (metadata) {
      metadata.data = jsonData;
      metadata.updated_at = Date.now();
      await metadata.save();
    } else {
      const newMetadata = new Metadata({
        image_id: jsonData.image_id || null,
        unique_id: jsonData.unique_id,
        data: jsonData
      });
      await newMetadata.save();
    }

    res.json(jsonData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;