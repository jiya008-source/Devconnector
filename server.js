const express=require('express');
const connectDB=require('./config/db');
const {check,validationResult}=require('express-validator');

const app=express();

//Connect Database
connectDB();
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
  'https://devconnector-1-gjlt.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
//Initialise moddleware
//It tells Express to accept JSON data from incoming requests and make it available in req.body.
//extended:false uses basic parsing
app.use(express.json({extended:false}));
app.use('/api/upload', require('./routes/api/upload'));
app.use('/uploads', express.static('uploads'));


//Define Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/auth',require('./routes/api/auth'));


const PORT=process.env.PORT||5001;
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
