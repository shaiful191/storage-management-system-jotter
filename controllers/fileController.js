import multer from 'multer';
import File from '../models/fileModel.js'; 




export const uploadFileController = (req, res) => {
 // console.log('User from authMiddleware:', req.user);  // Log the user information

  const file = req.file;

  if (!file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  if (!req.user) {
    return res.status(401).json({ msg: 'User not authenticated' });
  }

  const newFile = new File({
    userId: req.user._id, // Ensure userId is passed
    filename: file.originalname,
    path: file.path,
    size: file.size,
    uploadDate: new Date(),
    data: file.buffer,
    contentType: file.mimetype
  });

  newFile.save()
    .then(savedFile => {
      res.status(201).json({ msg: 'File uploaded successfully', file: savedFile });
    })
    .catch(err => {
      console.error('Error saving file:', err);
      res.status(500).json({ msg: 'Error saving file', error: err });
    });
};

export const getAllFilesController = async (req, res) => { 
  try {
    const files = await File.find({ userId: req.user._id }); 
    
    if (files.length === 0) {
      return res.status(404).json({ msg: 'No files found' });
    }

    res.json(files); // Send the files as JSON response
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};