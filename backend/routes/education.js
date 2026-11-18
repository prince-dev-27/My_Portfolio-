const router = require('express').Router();
const Education = require('../models/Education');
const auth = require('../middleware/auth');

// Get all education records
router.get('/', async (req, res) => {
  try {
    const { all } = req.query;
    let query = all === 'true' ? {} : { isPublished: true };
    const educationRecords = await Education.find(query).sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, count: educationRecords.length, data: educationRecords });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get single education record
router.get('/:id', async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education record not found' });
    }
    res.json({ success: true, data: education });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create education record (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const newEdu = new Education(req.body);
    const savedEdu = await newEdu.save();
    res.status(201).json({ success: true, data: savedEdu });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update education record (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedEdu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedEdu) {
      return res.status(404).json({ success: false, message: 'Education record not found' });
    }
    res.json({ success: true, data: updatedEdu });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete education record (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedEdu = await Education.findByIdAndDelete(req.params.id);
    if (!deletedEdu) {
      return res.status(404).json({ success: false, message: 'Education record not found' });
    }
    res.json({ success: true, message: 'Education record removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
