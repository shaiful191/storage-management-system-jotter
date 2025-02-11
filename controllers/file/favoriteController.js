import File from '../../models/file.js';  

export const toggleFavorite = async (req, res) => {
  try {
    console.log("Request Params:", req.params); 

    const { fileId } = req.params; 
    const userId = req.user._id; 
    let { isFavorite } = req.body;  
    // console.log("File ID:", fileId); 

    if (typeof isFavorite === "string") {
      isFavorite = JSON.parse(isFavorite);
    }

    // console.log("isFavorite :", isFavorite);

    
    const file = await File.findOneAndUpdate(
      { _id: fileId, userId }, 
      { $set: { isFavorite } }, 
      { new: true } 
    );

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json({ message: `File ${isFavorite ? "marked as favorite" : "removed from favorites"}`, file });

  } catch (error) {
    console.error("Error in toggleFavorite:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


