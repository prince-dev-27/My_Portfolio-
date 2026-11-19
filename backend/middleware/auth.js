const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'No authentication token, authorization denied' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('CRITICAL: JWT_SECRET environment variable is not defined.');
      return res.status(500).json({ success: false, message: 'Server authentication configuration error' });
    }

    const verified = jwt.verify(token, jwtSecret);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token is invalid or expired' });
  }
};

module.exports = auth;
