const express = require('express');
const Metadata = require('../models/Metadata');

const router = express.Router();

// Store metadata
router.post('/', async (req, res) => {
  try {
    const metadata = new Metadata({
      image_id: req.body.image_id,
      unique_id: req.body.unique_id,
      data: req.body.data
    });
    await metadata.save();
    res.json({ metadata_id: metadata._id, data: metadata.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve metadata
router.get('/:id', async (req, res) => {
  try {
    const metadata = await Metadata.findOne({ image_id: req.params.id });
    if (!metadata) {
      return res.status(404).json({ error: 'Metadata not found' });
    }
    res.json(metadata.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update metadata
router.put('/:id', async (req, res) => {
  try {
    const metadata = await Metadata.findOneAndUpdate(
      { image_id: req.params.id },
      { data: req.body.data, updated_at: Date.now() },
      { new: true }
    );
    if (!metadata) {
      return res.status(404).json({ error: 'Metadata not found' });
    }
    res.json({ metadata_id: metadata._id, data: metadata.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;