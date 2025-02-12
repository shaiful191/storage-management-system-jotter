import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { deleteAccount } from '../controllers/profile/deleteAccountController.js';

const router = express.Router();

router.delete("/delete-account", authMiddleware, deleteAccount);

export default router;