// dotenv
const dotenv = require('dotenv').config();

// libraries
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const socketio = require('socket.io');

// local dependencies
const db = require('./db');
const passport = require('./passport');
const views = require('./routes/views');
const api = require('./routes/api');


// initialize express app
const app = express();

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up sessions
app.use(session({
  secret: 'session-secret',
  resave: 'false',
  saveUninitialized: 'true'
}));

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

// authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate(
    'google',
    { failureRedirect: '/login' }
  ),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// set routes
app.use('/', views);
app.use('/api', api );
app.use('/static', express.static('public'));

// 404 route
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// route error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    status: err.status,
    message: err.message,
  });
});

// port config
// config variable
const port = (process.env.PORT || 3000); //const port = 3000; 

const server = http.Server(app);

//configure socket.io
const io = socketio(server);
app.set('socketio', io);

io.on('connection', function(socket){
  console.log('a user connected');
});


server.listen(port, function() {
  console.log('Server running on port: ' + port);
});
