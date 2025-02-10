import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { uploadFileController } from '../controllers/fileController.js';
import multer from 'multer';

const router = express.Router();

// Set up the file upload route using multer
const upload = multer({ dest: 'uploads/' }); // Set where to store the uploaded files

// Protect the route with authentication
router.post('/upload', authMiddleware, upload.single('file'), uploadFileController);

export default router;
