// 📁 server/routes/file.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('../models/File');
const auth = require('../middleware/auth');

const router = express.Router();

// Create 'uploads' folder manually if it doesn't exist
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Upload route
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      downloadLink: `${process.env.BASE_URL}/uploads/${req.file.filename}`,
      uploadedBy: req.user.id
    });
    await file.save();
    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all user’s files
router.get('/', auth, async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user.id });
    res.json({ files });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const file = await File.findOneAndDelete({
      _id: req.params.id,
      uploadedBy: req.user.id,
    });

    if (!file) return res.status(404).json({ message: 'File not found' });

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Public download link
router.get('/download/:filename', async (req, res) => {
  try {
    const file = await File.findOne({ path: `uploads/${req.params.filename}` });

    if (!file) return res.status(404).json({ message: 'File not found or expired' });

    res.download(file.path, file.originalName);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
