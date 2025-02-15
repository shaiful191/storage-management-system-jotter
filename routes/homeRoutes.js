import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { uploadFileController, getAllFilesController, getRecentFilesController, renameFileController, deleteFileController, getUserStorageUsageController,getSingleFileController } from '../controllers/home/fileController.js';
import { getImagesController, getPdfsController, getNotesController, getFoldersController, getFileStorageCountController } from '../controllers/home/getFilesSeparatelyController.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

router.post('/upload', authMiddleware, upload.single('file'), uploadFileController);
router.get('/all', authMiddleware, getAllFilesController);
router.get('/single/:id', authMiddleware, getSingleFileController);
router.get('/recent', authMiddleware, getRecentFilesController);
router.put('/rename/:id',authMiddleware, renameFileController);
router.delete('/deleteOne/:id', authMiddleware, deleteFileController);
router.get('/getTotalUsagesStorageCount', authMiddleware, getUserStorageUsageController);

// Get files separately
router.get('/images', authMiddleware, getImagesController);
router.get('/pdfs', authMiddleware, getPdfsController);
router.get('/notes', authMiddleware, getNotesController);
router.get('/folders', authMiddleware, getFoldersController);
router.get('/storageUseSeparately', authMiddleware, getFileStorageCountController);



export default router;
