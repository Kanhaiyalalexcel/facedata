const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const Image = require('../models/Image');
const Metadata = require('../models/Metadata');

const router = express.Router();

// Export JSON
router.post('/json', async (req, res) => {
  try {
    const { image_id, directory, metadata } = req.body;
    const image = await Image.findById(image_id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const fileName = `${image.unique_id}.json`;
    const filePath = path.join(__dirname, '../Uploads/images', directory || '', fileName);

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(metadata, null, 2));

    res.json({ file_url: `/uploads/images/${directory || ''}/${fileName}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;