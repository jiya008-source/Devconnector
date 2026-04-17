const mongoose = require('mongoose');
const config = require('config');

const db = process.env.mongoURI || config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;

//While mongoDB is connecting, Node.js does not block, it can continue handling other requests because 
//the connection is asynchrounous.

//async lets a function handle promises(that i will provide the value of connectDB later in the future, 
//basically an object value) and await tells that function to pause until a Promise finishes - 
//without blocking the rest of the program 

//ie function waits until db is connected