const express = require('express');
const steps = require('../data/steps');
const router = express.Router();

// Public view: no answers.
router.get('/steps', (req, res) => {
  res.json(steps.map(({ id, type, title, tip, hand, table }) => ({ id, type, title, tip, hand, table })));
});

router.post('/validate', (req, res) => {
  const { stepId, action } = req.body || {};
  const step = steps.find((s) => s.id === Number(stepId));
  if (!step || typeof action !== 'string') {
    return res.status(400).json({ valid: false, message: 'Invalid tutorial step.' });
  }
  if (action === step.expected) return res.json({ valid: true, message: step.success });
  res.json({ valid: false, message: step.hints[action] || step.fallback });
});

module.exports = router;
