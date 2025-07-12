// 📁 server/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.get('/', (req, res) => {
  res.send('🚀 CloudVault Backend Running!');
});



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(process.env.PORT, () =>
      console.log(`🌐 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
