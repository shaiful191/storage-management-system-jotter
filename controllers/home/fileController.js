import File from '../../models/file.js';
import { formatBytes } from '../../utils/formatBytes.js';

export const uploadFileController = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    if (!req.user) {
      return res.status(401).json({ msg: 'User not authenticated' });
    }

    const newFile = new File({
      userId: req.user._id, 
      filename: file.originalname,
      path: file.path,
      size: file.size,
      uploadDate: new Date(),
      data: file.buffer.toString('base64'),
      contentType: file.mimetype
    });

    const savedFile = await newFile.save(); 

    res.status(201).json({ msg: 'File uploaded successfully', file: savedFile });
  } catch (error) {
    
    res.status(500).json({ msg: 'Error saving file', error: error.message });
  }
};


export const getAllFilesController = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user._id });

    if (files.length === 0) {
      return res.status(404).json({ msg: 'No files found' });
    }

    res.json(files); 
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getRecentFilesController = async (req, res) => {
  try {
    const recentFiles = await File.find({ userId: req.user._id })
      .sort({ uploadDate: -1 })
      .limit(4);

    if (recentFiles.length === 0) {
      return res.status(404).json({ msg: 'No file found' });
    }

    res.status(200).json({ files: recentFiles });
  } catch (error) {
    
    res.status(500).json({ msg: 'Error fetching recent files', error: error.message });
  }
};


export const deleteFileController = async (req, res) => {
  try {
    const fileId = req.params.id;  
    const file = await File.findOne({ _id: fileId, userId: req.user._id });

    if (!file) {
      return res.status(404).json({ msg: 'File not found or unauthorized' });
    }

    await File.deleteOne({ _id: fileId }); 

    res.status(200).json({ msg: 'File deleted successfully' });
  } catch (error) {
    
    res.status(500).json({ msg: 'Error deleting file', error: error.message });
  }
};

export const renameFileController = async (req, res) => {
  try {
    const fileId = req.params.id; 
    const { newFilename } = req.body; 
    if (!newFilename || typeof newFilename !== 'string' || newFilename.trim() === '') {
      return res.status(400).json({ msg: 'New filename is required and must be a non-empty string' });
    }
    const file = await File.findOne({ _id: fileId, userId: req.user._id });   

    if (!file) {
      return res.status(404).json({ msg: 'File not found or unauthorized' });
    }
       
    file.filename = newFilename.trim(); 
    await file.save(); 

    res.status(200).json({ msg: 'File renamed successfully', file });
  } catch (error) {
    console.error('Error renaming file:', error);
    res.status(500).json({ msg: 'Error renaming file', error: error.message });
  }
};

export const getUserStorageUsageController = async (req, res) => {
  try {
    const totalStorageLimit = 15 * 1024 * 1024 * 1024; 

    const files = await File.find({ userId: req.user._id });
    const usedStorage = files.reduce((acc, file) => acc + file.size, 0);
    const availableStorage = totalStorageLimit - usedStorage;

    res.json({
      usedStorage: formatBytes(usedStorage),
      availableStorage: formatBytes(availableStorage),
      totalStorage: formatBytes(totalStorageLimit)
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



