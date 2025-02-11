import File from '../models/file.js';
import User from '../models/User.js';


// Function to check if user has exceeded storage limit
export const checkStorageLimit = async (userId, fileSize) => {
  const user = await User.findById(userId);
  const totalUsedStorage = user.usedStorage + fileSize;

  if (totalUsedStorage > user.storageLimit) {
    throw new Error('Storage limit exceeded');
  }

  // Update user's used storage
  user.usedStorage = totalUsedStorage;
  await user.save();
};

// Function to upload file
export const uploadFile = async (fileData) => {
  const { userId, name, type, size, parentFolder } = fileData;

  // Check if the user has exceeded their storage limit
  await checkStorageLimit(userId, size);

  const file = new File({
    name,
    type,
    size,
    parentFolder: parentFolder || null,
    userId
  });

  await file.save();
  return file;
};

// Function to get total storage usage for a user
export const getTotalStorageUsage = async (userId) => {
  const user = await User.findById(userId);
  return user.usedStorage;
};
