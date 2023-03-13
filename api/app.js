var createError = require('http-errors');
const mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var examsRouter = require('./routes/exams')
var usersRouter = require('./routes/users')
var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config();

//exams route
app.use('/api/exams', examsRouter);

//users route
app.use('/api/users', usersRouter)

app.get('/', (req, res) =>{
  res.json({mssg: 'Welcome to the app'})
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


//connect to db using mongoose
//creating a connection pool 
const { MongoClient } = require('mongodb');
mongoose.set("strictQuery", false);
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000, // set socket timeout to 30 seconds
  keepAlive: true,
  keepAliveInitialDelay: 30000, 
  retryWrites: true
}
// create a connection pool with 10 connections
const poolSize = 10;
const mongoClient = new MongoClient(process.env.MONG_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: poolSize,
});

// connect to the database using the connection pool
mongoClient.connect()
  .then(() => {
    console.log(`Connected to MongoDB using connection pool with ${poolSize} connections`);

    // get the database URI string from the MongoDB client
    const dbURI = process.env.MONG_URI;

    // create a Mongoose connection using the database URI string
    mongoose.connect(dbURI, mongooseOptions)
      .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
          console.log(`App listening on port ${process.env.PORT}`);
        });
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
