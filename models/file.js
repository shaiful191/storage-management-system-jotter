import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  filename: {
    type: String,
    required: true
  },

  size: {
    type: Number,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  
  uploadDate: {
    type: Date,
    default: Date.now
  },
  contentType: {
    type: String,
  },
  data: {
    type: String,
    required: true
  },
 
 
  

});

const File = mongoose.model('File', fileSchema);

export default File;
