// bodyparser is included in express

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// configures - this gonna have env variables in .env file
require('dotenv').config();

// express server
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());    // allow us to parse json - our server going to be sending and receiving json

//connect to mongodb


// mongoose.Promise = global.Promise;

// const uri = process.env.MONGODB_URI;
const uri = process.env.ATLAS_URI;  // database uri - get from mongodb atlas dashboard
mongoose.connect(uri && 'mongodb://localhost:27017/ExerciseTrackerApp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
    // .then(() => console.log('Database Connected'))
    // .catch(err => console.log(err));

    // 'mongodb://localhost:27017/ExerciseTracker' || 

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//tell the server to use the created files 
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// starts server - listenin on some port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});