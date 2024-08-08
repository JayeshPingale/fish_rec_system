const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Image = require('./models/Image'); // Assuming you've set up a model
require('dotenv').config(); // Make sure you have dotenv installed and configured

const app = express();
const upload = multer({ dest: 'uploads/' }); // Or configure as needed

// Route for uploading images
app.post('/api/images/upload', upload.single('image'), async (req, res) => {
  try {
    const newImage = new Image({
      imageName: req.file.originalname,
      imagePath: req.file.path,
    });
    await newImage.save();
    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Connect to MongoDB using the environment variable
console.log('MONGOURI:', process.env.MONGOURI);
mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => app.listen(5000, () => console.log('Server started on port 5000')))
.catch(err => console.log(err));