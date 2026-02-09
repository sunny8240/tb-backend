const express = require('express');
const router = express.Router();
const { 
  getAllStates, 
  getAllStatesAdmin,
  getStateBySlug,
  createState,
  updateState,
  deleteState,
  approveState
} = require('../controllers/stateController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getAllStates);

router.get('/all', protect, authorize('admin'), getAllStatesAdmin);

router.get('/:slug', getStateBySlug);
router.post('/', protect, authorize('admin'), createState);
router.put('/:id', protect, authorize('admin'), updateState);
router.patch('/:id/approve', protect, authorize('admin'), approveState);
router.delete('/:id', protect, authorize('admin'), deleteState);

module.exports = router;
