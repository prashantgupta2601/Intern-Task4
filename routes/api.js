const express = require('express');
const router = express.Router();
const apiService = require('../services/apiService');

/**
 * Middleware to check if user is authenticated
 */
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    success: false,
    message: 'Unauthorized: Please log in first'
  });
};

/**
 * @route   GET /api/data
 * @desc    Fetch external crypto data from CoinGecko
 * @access  Private
 */
router.get('/data', ensureAuth, async (req, res, next) => {
  try {
    const data = await apiService.fetchData();
    res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    // Pass error to centralized error handler
    next(error);
  }
});

module.exports = router;
