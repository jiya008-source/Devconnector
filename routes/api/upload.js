const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), (req, res) => {
  console.log('Upload route hit');
  console.log('CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
  console.log('API_KEY:', process.env.CLOUDINARY_API_KEY);
  console.log('File received:', req.file ? req.file.originalname : 'NO FILE');

  if (!req.file) {
    return res.status(400).json({ msg: 'No file received' });
  }

  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) resolve(result);
        else reject(error);
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  streamUpload(req)
    .then((result) => {
      console.log('Upload success:', result.secure_url);
      res.json({ filePath: result.secure_url });
    })
    .catch((err) => {
      console.error('Cloudinary upload error:', JSON.stringify(err));
      res.status(500).json({ msg: 'Upload failed', error: err.message });
    });
});

module.exports = router;