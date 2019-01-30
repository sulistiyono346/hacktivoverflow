var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()


var IndexRouter = require('./routes/index');
var QuestionsRouter = require('./routes/questions')
var AnswerRouter = require('./routes/answers')
var VotesRouter = require('./routes/votes')
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let db_connection = 'mongodb://localhost/getanswer'
mongoose.connect(db_connection, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('DB Connected!');
})

app.use('/', IndexRouter);
app.use('/questions', QuestionsRouter)
app.use('/answers', AnswerRouter)
app.use('/votes', VotesRouter )

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
