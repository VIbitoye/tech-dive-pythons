var createError = require('http-errors');
const mongoose = require('mongoose');
var express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
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
app.use(express.static(path.join(__dirname, 'build')));

app.use(history({
  disableDotRule: true,
  verbose: true
}));

// serve static files from the build directory (again)
app.use(express.static(path.join(__dirname, 'build')));


require('dotenv').config();

//exams route
app.use('/api/exams', examsRouter);

//users route
app.use('/api/users', usersRouter)

app.get('/', (req, res) =>{
  res.json({mssg: 'Welcome to the app'})
})


//connect to db uisng mongoose
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    //listen for requests
  app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
  })
  })
  .catch((error) => {
    console.log(error)
  })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
