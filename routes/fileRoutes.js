import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { uploadFileController, getAllFilesController, getRecentFilesController, deleteFileController } from '../controllers/file/fileController.js';
import { toggleFavorite } from '../controllers/file/favoriteController.js';
import multer from 'multer';
 
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

router.post('/upload', authMiddleware, upload.single('file'), uploadFileController);
router.get('/all', authMiddleware, getAllFilesController);
router.get('/recent', authMiddleware, getRecentFilesController);
router.delete('/delete-one/:id', authMiddleware, deleteFileController);
router.put('/favorite/:fileId', authMiddleware, toggleFavorite);



export default router;
