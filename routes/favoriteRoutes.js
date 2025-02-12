import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { toggleFavorite,getFavoriteFiles } from '../controllers/favorite/favoriteController.js';


const router = express.Router();

router.get('/all', authMiddleware, getFavoriteFiles);
router.put('/:fileId', authMiddleware, toggleFavorite);

export default router;