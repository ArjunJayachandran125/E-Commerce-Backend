import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { createOrder, getOrder } from '../controllers/orderController';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/:id', protect, getOrder);

export default router;