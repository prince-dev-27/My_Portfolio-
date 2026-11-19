const router = require('express').Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('CRITICAL: JWT_SECRET environment variable is not defined.');
      return res.status(500).json({ success: false, message: 'Server authentication configuration error' });
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      jwtSecret,
      { expiresIn }
    );

    res.json({
      success: true,
      token,
      admin: { id: admin._id, username: admin.username, name: admin.name, email: admin.email }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Verify Token / Get Current Admin
router.get('/me', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update Admin Credentials / Profile
router.put('/update', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword, name, email } = req.body;
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    if (name) admin.name = name;
    if (email) admin.email = email;

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ success: false, message: 'Current password is required to set a new password' });
      }
      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Current password is incorrect' });
      }
      admin.password = await bcrypt.hash(newPassword, 10);
    }

    await admin.save();
    res.json({ success: true, message: 'Admin profile updated successfully', admin: { id: admin._id, name: admin.name, email: admin.email, username: admin.username } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
