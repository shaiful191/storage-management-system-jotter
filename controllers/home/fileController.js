import File from '../../models/file.js'; 

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
      userId: req.user._id, // Ensure userId is passed
      filename: file.originalname,
      path: file.path,
      size: file.size,
      uploadDate: new Date(),
      data: file.buffer.toString('base64'),
      contentType: file.mimetype
    });

    const savedFile = await newFile.save(); // Await saving to DB

    res.status(201).json({ msg: 'File uploaded successfully', file: savedFile });
  } catch (error) {
   // console.error('Error saving file:', error);
    res.status(500).json({ msg: 'Error saving file', error: error.message });
  }
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

  export const getRecentFilesController = async (req, res) => { 
  try {
    const recentFiles = await File.find({ userId: req.user._id })
      .sort({ uploadDate: -1 }) 
      .limit(3); 

    if (recentFiles.length === 0) {
      return res.status(404).json({ msg: 'No file found' });
    }

    res.status(200).json({ files: recentFiles });
  } catch (error) {
    // console.error('Error fetching recent files:', error);
    res.status(500).json({ msg: 'Error fetching recent files', error: error.message });
  }
};


  export const deleteFileController = async (req, res) => {
  try {
    const fileId = req.params.id;

    // Find the file by ID and user ID
    const file = await File.findOne({ _id: fileId, userId: req.user._id });

    if (!file) {
      return res.status(404).json({ msg: 'File not found or unauthorized' });
    }

    await File.deleteOne({ _id: fileId }); // Delete file

    res.status(200).json({ msg: 'File deleted successfully' });
  } catch (error) {
    // console.error('Error deleting file:', error);
    res.status(500).json({ msg: 'Error deleting file', error: error.message });
  }
};

