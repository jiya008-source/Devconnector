const express=require('express');
const connectDB=require('./config/db');
const {check,validationResult}=require('express-validator');

const app=express();

//Connect Database
connectDB();
const cors = require('cors');

app.use(cors({
  origin: 'https://devconnector-1-gjlt.onrender.com',
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
