const router = require('express').Router();
const Experience = require('../models/Experience');
const auth = require('../middleware/auth');

// Get all experience items
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json({ success: true, count: experiences.length, data: experiences });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create experience (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const newExp = new Experience(req.body);
    const savedExp = await newExp.save();
    res.status(201).json({ success: true, data: savedExp });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update experience (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedExp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedExp) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, data: updatedExp });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete experience (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedExp = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExp) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, message: 'Experience removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
