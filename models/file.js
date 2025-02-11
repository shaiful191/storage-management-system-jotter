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
  
  uploadDate: {
    type: Date,
    default: Date.now
  },
  data: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
  

});

const File = mongoose.model('File', fileSchema);

export default File;
