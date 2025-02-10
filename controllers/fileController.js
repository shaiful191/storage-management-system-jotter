import multer from 'multer';
import File from '../models/fileModel.js'; 


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});


const upload = multer({ 
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 } 
});


export const uploadFileController = (req, res) => {
  console.log('User from authMiddleware:', req.user);  // Log the user information

  const file = req.file;

  if (!file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  if (!req.user) {
    return res.status(401).json({ msg: 'User not authenticated' });
  }

  const newFile = new File({
    userId: req.user._id, // Ensure userId is passed
    filename: file.filename,
    path: file.path,
    size: file.size,
    fileType: file.mimetype,
    uploadDate: new Date()
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