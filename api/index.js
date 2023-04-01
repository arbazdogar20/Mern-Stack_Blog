const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const catRoute = require('./routes/categories');
const ngrok = require('ngrok');

const app = express();
dotenv.config();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Database Connected'))
  .catch((error) => console.log(error));

// Image Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({storage: storage});
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has ben uploaded successfully');
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', catRoute);

app.listen(5000, () => {
  console.log('App Is Running On Port 5000');
});
