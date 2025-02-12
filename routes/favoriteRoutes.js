import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { toggleFavorite,getFavoriteFiles } from '../controllers/favorite/favoriteController.js';
import {getAllFilesByDate} from '../controllers/favorite/calenderWiseFileSelectController.js';

const router = express.Router();
//favorite routes
router.get('/all', authMiddleware, getFavoriteFiles);
router.put('/:fileId', authMiddleware, toggleFavorite);

//getAllFilesByDate
router.get('/getAllFilesByDate/:date', authMiddleware, getAllFilesByDate);

export default router;