const express = require('express');
const multer = require('multer');
const Image = require('../models/Image');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  const { originalname, buffer, mimetype } = req.file;

  const newImage = new Image({
    filename: originalname,
    data: buffer,
    contentType: mimetype,
  });

  try {
    await newImage.save();
    res.json({ message: 'Image uploaded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload image' });
  }
});

module.exports = router;
