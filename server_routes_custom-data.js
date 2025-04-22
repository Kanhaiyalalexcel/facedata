const express = require('express');

const router = express.Router();

// Categorize custom data
router.post('/categorize', async (req, res) => {
  try {
    const customData = req.body; // { uv_index: 10, humidity_percent: 60, ... }
    const categorized = {
      environment: {},
      health_metrics: {},
      lifestyle: {},
      additional: {}
    };

    Object.entries(customData).forEach(([key, value]) => {
      if (['uv_index', 'aqi', 'humidity_percent', 'lighting'].includes(key)) {
        categorized.environment[key] = value;
      } else if (['medications', 'skincare'].includes(key)) {
        categorized.health_metrics[key] = value;
      } else if (['sleep', 'exercise'].includes(key)) {
        categorized.lifestyle[key] = value;
      } else if (['life_events', 'tags'].includes(key)) {
        categorized.additional[key] = value;
      }
    });

    // AI Placeholder: Integrate BERT-based classifier
    // const aiCategories = await classifyWithAI(customData);

    res.json(categorized);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;