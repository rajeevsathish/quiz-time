'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');
var Room = require('../models/room');
var adminUser = 'admin'
// Home page
router.get('/', function(req, res, next) {
  // If user is already logged in, then redirect to rooms page
  if (req.isAuthenticated()) {
    res.redirect('/rooms');
  } else {
    res.render('login', {
      success: req.flash('success')[0],
      errors: req.flash('error'),
      showRegisterForm: req.flash('showRegisterForm')[0]
    });
  }
});

// Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/rooms',
  failureRedirect: '/',
  failureFlash: true
}));

// Register via username and password
router.post('/register', function(req, res, next) {

  var credentials = { 'username': req.body.username, 'password': req.body.password };

  if (credentials.username === '' || credentials.password === '') {
    req.flash('error', 'Missing credentials');
    req.flash('showRegisterForm', true);
    res.redirect('/');
  } else {

    // Check if the username already exists for non-social account
    User.findOne({ 'username': new RegExp('^' + req.body.username + '$', 'i') }, function(err, user) {
      if (err) throw err;
      if (user) {
        req.flash('error', 'Username already exists.');
        req.flash('showRegisterForm', true);
        res.redirect('/');
      } else {
        User.create(credentials, function(err, newUser) {
          if (err) throw err;
          req.flash('success', 'Your account has been created. Please log in.');
          res.redirect('/');
        });
      }
    });
  }
});

// Rooms
router.get('/rooms', [User.isAuthenticated, function(req, res, next) {
  Room.find({ isOpen: true }, function(err, rooms) {
    // console.log("in get here ... ", err, rooms);
    if (err) throw err;
    res.render('rooms', { rooms,  user: req.user});
  });
}]);

// Game Room 
router.get('/game/:id', [User.isAuthenticated, function(req, res, next) {
  var roomId = req.params.id;
  Room.findById(roomId, function(err, room) {
    if (err) throw err;
    if (!room) {
      return next();
    }
    console.log('redirecting to game room', req.user);
    if(req.user.username === adminUser){
      console.log('loading as admin');
      res.render('admin_game_room', { user: req.user, room: room });
    } else {
      res.render('gameroom', { user: req.user, room: room });
    }
  });
}]);
// quiz results
router.get('/admin/result/:id', [User.isAuthenticated, function(req, res, next) {
  var roomId = req.params.id;
  Room.findById(roomId, function(err, room) {
    if (err) throw err;
    if (!room) {
      return next();
    }
    var result = {}; 
    room.score.forEach((round) => {
      if(!round.answers){
        return;
      }
      Object.keys(round.answers).forEach((userId) => {
        if(result[userId]){
          result[userId].finalScore = result[userId].finalScore + round.answers[userId].point;
        } else {
          result[userId] = { 
            finalScore: round.answers[userId].point,
            userName: round.answers[userId].userName
          }
        }
      })
    })
    var participant = [];
    Object.keys(result).forEach((user) => {
      participant.push(result[user])
    })
    participant.sort((last, cur) => cur.finalScore - last.finalScore)
    console.log('admin result redirection', room.score, result, participant);
    res.render('admin_quiz_results', { user: req.user, participant: participant });
  });
}]);
// // Admin Game Room 
// router.get('/admin/game/:id', [User.isAuthenticated, function(req, res, next) {
//   var roomId = req.params.id;
//   Room.findById(roomId, function(err, room) {
//     if (err) throw err;
//     if (!room) {
//       return next();
//     }
//     console.log('redirecting to game room', req.user);
//     res.render('admin_game_room', { user: req.user, room: room });
//   });

// }]);

// Logout
router.get('/logout', function(req, res, next) {
  // remove the req.user property and clear the login session
  req.logout();

  // destroy session data
  req.session = null;

  // redirect to homepage
  res.redirect('/');
});

module.exports = router;