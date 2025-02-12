import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { deleteAccount } from '../controllers/profile/deleteAccountController.js';
import { editProfile } from '../controllers/profile/editProfileController.js';

const router = express.Router();

router.delete("/delete-account", authMiddleware, deleteAccount);
router.put("/edit-profile", authMiddleware, editProfile);

export default router;