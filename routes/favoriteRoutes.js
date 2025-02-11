import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

import { toggleFavorite } from '../controllers/favorite/favoriteController.js';
const router = express.Router();
router.put('/:fileId', authMiddleware, toggleFavorite);

export default router;