'use strict';

var config = require('../config');
// var redis = require('redis').createClient;
// var adapter = require('socket.io-redis');
var adminUser = 'admin'

var Room = require('../models/room');
var Question = require('../models/question');
var TIME_INTERVAL = 10000; //25 sec
/**
 * Encapsulates all code for emitting and listening to socket events
 *
 */

var ioEvents = function(io) {

  // Rooms namespace
  io.of('/rooms').on('connection', function(socket) {

    // Create a new room
    socket.on('createRoom', function(title) {
      Room.findOne({ 'title': new RegExp('^' + title + '$', 'i') }, function(err, room) {
        if (err) throw err;
        if (room) {
          socket.emit('updateRoomsList', { error: 'Room title already exists.' });
        } else {
          Room.create({
            title: title
          }, function(err, newRoom) {

            if (err) throw err;
            // send to current socket
            socket.emit('updateRoomsList', newRoom);
            // send to all other sockets
            socket.broadcast.emit('updateRoomsList', newRoom);
          });
        }
      });
    });
  });

  // gameroom namespace
  io.of('/gameroom').on('connection', function(socket) {
    console.log('---------------------------------some one joined game room');
    // Join a gameroom
    socket.on('join', function(roomId, isAdmin) {
      Room.findById(roomId, function(err, room) {
        console.log();
        if (err) throw err;
        if (!room) {
          // Assuming that you already checked in router that gameroom exists
          // Then, if a room doesn't exist here, return an error to inform the client-side.
          socket.emit('updateUsersList', { error: 'Room doesnt exist.' });
        } else {
          // Check if user exists in the session
          if (socket.request.session.passport == null) {
            return;
          }
          console.log('mongo room details', room);
          // check if there is empty seat in the game room
          if (room.currentRound == room.rounds) {
            socket.emit('updateUsersList', { error: 'Game has ended.' });
          } else if (room.noOfPlayers <= room.connections.length && !isAdmin) {
            socket.emit('updateUsersList', { error: 'Room is Full. Try again later' });
          } else {
            if (isAdmin) {
              socket.join(room.id);
              return;
            }
            Room.addUser(room, socket, function(err, newRoom) {
              console.log('found new room details', newRoom);
              // Join the room channel
              if(err){
                console.log('adding user failed', err);
              }
              socket.join(newRoom.id);
              if (newRoom.noOfPlayers == newRoom.connections.length) {
                newRoom.isOpen = false;
                newRoom.save();
                sendQuestion(socket, newRoom.id);
              }
              Room.getUsers(newRoom, socket, function(err, users, cuntUserInRoom) {
                if (err) throw err;
                // Return list of all user connected to the room to the current user
                socket.emit('updateUsersList', users, true);
                // Return the current user to other connecting sockets in the room 
                // ONLY if the user wasn't connected already to the current room
                if (cuntUserInRoom === 1) {
                  socket.broadcast.to(newRoom.id).emit('updateUsersList', users[users.length - 1]);
                }
              });
            });
          }
        }
      });
    });

    // When a socket exits
    socket.on('disconnect', function() {

      // Check if user exists in the session
      if (socket.request.session.passport == null) {
        return;
      }

      // Find the room to which the socket is connected to, 
      // and remove the current user + socket from this room
      Room.removeUser(socket, function(err, room, userId, cuntUserInRoom) {
        if (err) throw err;

        // Leave the room channel
        socket.leave(room.id);

        // Return the user id ONLY if the user was connected to the current room using one socket
        // The user id will be then used to remove the user from users list on gameroom page
        if (cuntUserInRoom === 1) {
          if (room.currentRound >= room.rounds) {
            // delist the quiz  or take score board
            room.isOpen = false;
            room.save();
          } else {
            // room availble for new palyer
            room.isOpen = true;
            room.save();
          }
          socket.broadcast.to(room.id).emit('removeUser', userId);
        }
      });
    });
    socket.on('youtube-played', function (roomId) {
      console.log('youtube played');
      timer(socket, roomId);
    })
    // When a new answer arrives
    socket.on('playerAnswer', function(roomId, message) {
      console.log(userId);
      var userId = message.userId;
      var userName = message.userName;
      var user_answer = message.content;
      var correct_answer = message.correct_answer;

      Room.findById(roomId, function(err, room) {
        if (err) throw err;
        if (!room) {
          socket.emit('updateUsersList', { error: 'Room doesnt exist.' });
        } else {
          // Check if user exists in the session
          if (socket.request.session.passport == null) {
            return;
          }
          if (!room.score[room.score.length - 1].answers) {
            room.score[room.score.length - 1].answers = {};
          }
          // console.log('room user update', room.score[room.score.length - 1].answers[userId]);
          if (!room.score[room.score.length - 1].answers[userId]) {
            // console.log('---------------------------------updating user score');
            const answers = room.score[room.score.length - 1].answers;
            if (correct_answer == user_answer) {
              answers[userId] = { point: 3,  userName: userName};
            } else {
              answers[userId] = { point: 0,  userName: userName};
            }
            room.score[room.score.length - 1].answers = answers;
            console.log('---------------------------------updating user score',
            answers)
            
            room.markModified('room.score[0]');
            room.save(function(err, suc){
              console.log('error while saving', err)
            });
          } else {
            console.log('dint update score', userId)
          }
        }
      });
    });
  });
}

var sendQuestion = function(socket, roomId) {
  console.log('======================================emitting new questions');
  Room.findById(roomId, function(err, room) {
    if (err) throw err;
    if (!room) {
      socket.emit('updateUsersList', { error: 'Room doesnt exist.' });
    } else {
      // Check if user exists in the session
      if (socket.request.session.passport == null) {
        return;
      }
      if (room.currentRound >= room.rounds) {
        // delist the quiz  or take score board
        room.isOpen = false;
        room.save();
        socket.emit('endQuiz', room);
        socket.broadcast.to(room.id).emit('endQuiz', room);
      } else {
        Question.getQuestionNumber(room.currentRound, function(err, question) {
          if (err) throw err;
          console.log('questionquestionquestionquestionquestionquestion', question);
          socket.emit('newRoundData', question);
          socket.broadcast.to(roomId).emit('newRoundData', question);
          if (question.multiMedia.type !== 'youtube') {
            timer(socket, roomId);
          }
        });
        // Room.incCurrentRound(room, function(err, newRoom) {});
      }
    }
  });
}

var timer = function(socket, roomId) {
  setTimeout(function() {
    console.log('timeout expired')
    Room.findById(roomId, function(err, room) {
      if (err) throw err;
      if (!room) {
        socket.emit('updateUsersList', { error: 'Room doesnt exist.' });
      } else {
        Room.incCurrentRound(room, function(err, newRoom) {
          if (err) throw err;
          sendQuestion(socket, roomId);
        });
      }
    });
  }, TIME_INTERVAL); //10 sec timeout
}
/**
 * Initialize Socket.io
 * Uses Redis as Adapter for Socket.io
 *
 */
var init = function(app) {

  var server = require('http').Server(app);
  var io = require('socket.io')(server);

  // Force Socket.io to ONLY use "websockets"; No Long Polling.
  io.set('transports', ['websocket']);

  // Allow sockets to access session data
  io.use((socket, next) => {
    require('../session')(socket.request, {}, next);
  });

  // Define all Events
  ioEvents(io);

  // The server object will be then used to list to a port number
  return server;
}

module.exports = init;