const express = require('express');
const router = express.Router();
const { 
  getAllDestinations,
  getDestinationBySlug,
  getDestinationById,
  getDestinationsByState,
  getNearbyDestinations,
  createDestination,
  updateDestination,
  getAllDestinationsAdmin,
  approveDestination,
  deleteDestination
} = require('../controllers/destinationController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/nearby', getNearbyDestinations);
router.get('/all', protect, authorize('admin'), getAllDestinationsAdmin);
router.get('/state/:stateId', getDestinationsByState);
router.get('/slug/:slug', getDestinationBySlug);
router.get('/:id', getDestinationById);
router.get('/', getAllDestinations);

// Admin routes
router.post('/', protect, authorize('admin'), createDestination);
router.put('/:id', protect, authorize('admin'), updateDestination);
router.patch('/:id/approve', protect, authorize('admin'), approveDestination);
router.delete('/:id', protect, authorize('admin'), deleteDestination);

module.exports = router;
