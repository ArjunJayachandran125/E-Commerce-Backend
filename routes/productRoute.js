import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController';

const router = express.Router();

router.route('/').post(protect, createProduct).get(getProducts);
router.route('/:id').get(getProduct).put(protect, updateProduct).delete(protect, deleteProduct);

export default router;