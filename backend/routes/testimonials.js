const router = require('express').Router();
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

// Get all testimonials (public gets approved ones, admin gets all)
router.get('/', async (req, res) => {
  try {
    const query = req.query.all === 'true' ? {} : { approved: true };
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create testimonial (Public submission)
router.post('/', async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    const saved = await newTestimonial.save();
    res.status(201).json({ success: true, message: 'Testimonial submitted successfully and pending review', data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update testimonial (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete testimonial (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
