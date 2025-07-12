// 📁 server/models/File.js
const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
  originalName: String,
  path: String,
  size: Number,
  downloadLink: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now, expires: '7d' } // auto-delete after 7 days
});

module.exports = mongoose.model('File', fileSchema);
