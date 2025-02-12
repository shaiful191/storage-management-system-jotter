import File from '../../models/file.js'; 
import { formatBytes } from '../../utils/formatBytes.js';

export const getImagesController = async (req, res) => {
  try {
    const images = await File.find({ 
      userId: req.user._id, 
      contentType: { $regex: /^image\// }  // Matches any image type (e.g., image/png, image/jpeg)
    });
    
    if (images.length === 0) {
      return res.status(404).json({ msg: 'No images found' });
    }
    res.json(images);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPdfsController = async (req, res) => {
  try {
    const pdfs = await File.find({ 
      userId: req.user._id, 
      contentType: 'application/pdf'  // PDFs have a fixed contentType
    });

    if (pdfs.length === 0) {
      return res.status(404).json({ msg: 'No PDFs found' });
    }
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getFoldersController = async (req, res) => {
  try {
    const folders = await File.find({ 
      userId: req.user._id, 
      contentType: 'folder'  // Assuming you store folders with this contentType
    });

    if (folders.length === 0) {
      return res.status(404).json({ msg: 'No folders found' });
    }
    res.json(folders);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getNotesController = async (req, res) => {
  try {
    const notes = await File.find({ 
      userId: req.user._id, 
      contentType: { $nin: ['folder', 'application/pdf'], $not: { $regex: /^image\// } } 
      // Exclude folders, PDFs, and images. Everything else is considered a note.
    });

    if (notes.length === 0) {
      return res.status(404).json({ msg: 'No notes found' });
    }
    res.json(notes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getFileStorageCountController = async (req, res) => {
  try {
    const fileCategories = [
      { type: 'image', query: { contentType: { $regex: /^image\// } } },
      { type: 'pdf', query: { contentType: 'application/pdf' } },
      { type: 'folder', query: { contentType: 'folder' } },
      { type: 'note', query: { contentType: { $nin: ['folder', 'application/pdf'], $not: { $regex: /^image\// } } } }
    ];

    const stats = {};

    for (const category of fileCategories) {
      const files = await File.find({ userId: req.user._id, ...category.query });
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);

      stats[category.type] = {
        count: files.length,
        totalSize: formatBytes(totalSize)
      };
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const getUserStorageUsageController = async (req, res) => {
//   try {
//     const totalStorageLimit = 15 * 1024 * 1024 * 1024; // 15GB in bytes
    
//     const files = await File.find({ userId: req.user._id });
//     const usedStorage = files.reduce((acc, file) => acc + file.size, 0);
//     const availableStorage = totalStorageLimit - usedStorage;
    
//     res.json({
//       usedStorage: formatBytes(usedStorage),
//       availableStorage: formatBytes(availableStorage),
//       totalStorage: formatBytes(totalStorageLimit)
//     });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

