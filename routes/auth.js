const express = require('express');
const router = express.Router();
const { 
  adminLogin,
  getCurrentUser,
  createAdminUser
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

/**
 * Admin login endpoint
 */
router.post('/admin-login', adminLogin);

/**
 * Get current user (protected)
 */
router.get('/me', protect, getCurrentUser);

module.exports = router;
