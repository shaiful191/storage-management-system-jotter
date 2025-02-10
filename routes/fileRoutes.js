import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { uploadFileController,getAllFilesController } from '../controllers/fileController.js';
import multer from 'multer';
import File from '../models/fileModel.js'; 

const router = express.Router();


const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB

}); 

router.post('/upload', authMiddleware, upload.single('file'), uploadFileController);
router.get('/all', authMiddleware, getAllFilesController);


export default router;
