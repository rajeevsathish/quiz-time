'use strict';
var currentQuestion = null;
var playerScore = 0;
var userDetails;
var roomDetails;
var socket;
var app = {

  rooms: function() {

    socket = io('/rooms', { transports: ['websocket'] });

    // When socket connects, get a list of gamerooms
    socket.on('connect', function() {

      // Update rooms list upon emitting updateRoomsList event
      socket.on('updateRoomsList', function(room) {

        // Display an error message upon a user error(i.e. creating a room with an existing title)
        $('.room-create p.message').remove();
        if (room.error != null) {
          $('.room-create').append(`<p class="message error">${room.error}</p>`);
        } else {
          app.helpers.updateRoomsList(room);
        }
      });

      // Whenever the user hits the create button, emit createRoom event.
      $('.room-create button').on('click', function(e) {
        var inputEle = $("input[name='title']");
        var roomTitle = inputEle.val().trim();
        if (roomTitle !== '') {
          socket.emit('createRoom', roomTitle);
          inputEle.val('');
        }
      });

    });
  },

  game: function(roomId, userName, userId) {
    console.log('inside game room', roomId, userName, userId);
    socket = io('/gameroom', { transports: ['websocket'] }); // connect to gameroom socket

    // When socket connects, join the current gameroom
    socket.on('connect', function() {
      console.log('connecting to socket');
      socket.emit('join', roomId); // emit join event 
      // Update users list upon emitting updateUsersList event
      socket.on('updateUsersList', function(users, clear) {
        console.log('updateUsersList', users)
        $('.container p.message').remove();
        if (users.error != null) {
          $('.container').html(`<p class="message error">${users.error}</p>`);
        } else {
          app.helpers.updateUsersList(users, clear);
        }
      });
        // Whenever the user hits the save button, emit newMessage event.
      $(".chat-message button").on('click', function(e) {
        var messageContent = $('.selectable').find('.ui-selected').attr('id');
        if (messageContent !== '') {

          if (currentQuestion.user_answer == null) {
            currentQuestion.user_answer = messageContent;
            if (currentQuestion.answer == currentQuestion.user_answer) {
              playerScore += 3;
            } else {
              playerScore -= 1;
            }
          }
          var message = {
            content: messageContent,
            userId: userId,
            userName: userName,
            correct_answer: currentQuestion.answer
          };

          socket.emit('playerAnswer', roomId, message);
          app.helpers.updatePlayerScore();
          $(".chat-message button").prop('disabled', true);;
          // app.helpers.addMessage(message);
        }
      });
      // Whenever a user leaves the current room, remove the user from users list
      socket.on('removeUser', function(userId) {
        $('li#user-' + userId).remove();
        app.helpers.updateNumOfUsers();
      });

      // show new question
      socket.on('newRoundData', function(question) {
        app.helpers.showQuestion(question, false);
      });

      socket.on('endQuiz', function(room) {
        // eventually show leaderboard
        // console.log("this is what I found: ", room);
        // take back to rooms list page.
        window.location = "/rooms";
      });

    });
  },
  admin: function(roomId, username, userId) {
    userDetails = {
      roomId,
      username,
      userId
    }
    console.log('inside game room', roomId, username, userId);
    socket = io('/gameroom', { transports: ['websocket'] }); // connect to gameroom socket

    // When socket connects, join the current gameroom
    socket.on('connect', function() {
      console.log('connecting to socket');
      socket.emit('join', roomId, true); // emit join event 

      // Update users list upon emitting updateUsersList event
      socket.on('updateUsersList', function(users, clear) {
        console.log('updateUsersList', users)
        $('.container p.message').remove();
        if (users.error != null) {
          $('.container').html(`<p class="message error">${users.error}</p>`);
        } else {
          app.helpers.updateUsersList(users, clear);
        }
      });

      // Whenever a user leaves the current room, remove the user from users list
      socket.on('removeUser', function(userId) {
        $('li#user-' + userId).remove();
        app.helpers.updateNumOfUsers();
      });

      // show new question
      socket.on('newRoundData', function(question) {
        app.helpers.showQuestion(question, true);
      });

      socket.on('endQuiz', function(room) {
        // eventually show leaderboard
        // console.log("this is what I found: ", room);
        // take back to rooms list page.
        window.location = "/admin/result/" + roomId;
      });

    });
  },
  helpers: {

    encodeHTML: function(str) {
      return $('<div />').text(str).html();
    },

    // Update rooms list
    updateRoomsList: function(room) {
      room.title = this.encodeHTML(room.title);
      var html = `<a href="/game/${room._id}"><li class="room-item">${room.title}</li></a>`;

      if (html === '') { return; }

      if ($(".room-list ul li").length > 0) {
        $('.room-list ul').prepend(html);
      } else {
        $('.room-list ul').html('').html(html);
      }
      this.updateNumOfRooms();
    },

    // Update users list
    updateUsersList: function(users, clear) {
      if (users.constructor !== Array) {
        users = [users];
      }

      var html = '';
      for (var user of users) {
        user.username = this.encodeHTML(user.username);
        html += `<li class="clearfix" id="user-${user._id}">
                     <img src="${user.picture}" alt="${user.username}" />
                     <div class="about">
                        <div class="name">${user.username}</div>
                        <div class="status"><i class="fa fa-circle online"></i> online</div>
                     </div></li>`;
      }

      if (html === '') { return; }

      if (clear != null && clear == true) {
        $('.users-list ul').html('').html(html);
      } else {
        $('.users-list ul').prepend(html);
      }
      this.updateNumOfUsers();
    },
    showQuestion: function(question, admin) {
      currentQuestion = question;
      currentQuestion.user_answer = null;
      if (admin) {
        var html = `<div class="message my-message" dir="auto">${question.question}</div>`;
        console.log(question);
        if (question.multiMedia.type === 'img') {
          var imgTag = `<img width="400" height="200" src=${question.multiMedia.link} alt="Smiley face" height="42" width="42">`
          html = html + imgTag;
        } else if (question.multiMedia.type === 'youtube') {
          const youtube = `<iframe width="400" height="200" src="https://www.youtube.com/embed/DL1HHrrhMbs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
          html = html + youtube + `<div class="youtube-played">
            <button type="submit">Start Timer</button>
          </div>`;
        }
        $('.chat-history').html(html);
        $(".youtube-played button").on('click', function(e) {
          socket.emit('youtube-played', userDetails.roomId);
        });
      } else {
        var html = `
        <div class="message-data selectable">
          <span class="message-data-name" id="A">  A: ${question.options.A}</span></br>
          <span class="message-data-name" id="B">  B: ${question.options.B}</span></br>
          <span class="message-data-name" id="C">  C: ${question.options.C}</span></br>
          <span class="message-data-name" id="D">  D: ${question.options.D}</span></br>
        </div>`;
        $('.chat-history').html(html);
        $('.chat-history .selectable').selectable();
        $(".chat-message button").prop('disabled', false);
      }

    },

    // Update number of rooms
    // This method MUST be called after adding a new room
    updateNumOfRooms: function() {
      var num = $('.room-list ul li').length;
      $('.room-num-rooms').text(num + " Room(s)");
    },

    updatePlayerScore: function() {
      $('.score-holder').text("Score: " + playerScore);
    },

    // Update number of online users in the current room
    // This method MUST be called after adding, or removing list element(s)
    updateNumOfUsers: function() {
      var num = $('.users-list ul li').length;
      $('.chat-num-users').text(num + " User(s)");
    }
  }
};