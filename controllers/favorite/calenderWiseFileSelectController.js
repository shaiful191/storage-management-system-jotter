import File from '../../models/file.js';  

  
export const getAllFilesByDate = async (req, res) => {
  try {
    const { date } = req.params;

    // Convert the date string to a Date object
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Find files uploaded on the specified date
    const files = await File.find({
      uploadDate: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
