const express = require('express');
const router = express.Router();
const { 
  adminLogin,
  getCurrentUser,
  createAdminUser
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

router.post('/admin-login', adminLogin);

router.get('/me', protect, getCurrentUser);

module.exports = router;
