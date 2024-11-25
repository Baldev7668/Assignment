const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', protect, authorize('Admin', 'Manager'), createTask);
router.get('/', protect, getTasks);
router.put('/:id', protect, authorize('Admin', 'Manager'), updateTask);
router.delete('/:id', protect, authorize('Admin'), deleteTask);

module.exports = router;
