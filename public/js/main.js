'use strict';
var currentQuestion = null;
var playerScore = 0;
var userDetails;
var roomDetails;
var socket;
var initializedPlayer = false;
const queOptions =  {
  "text": "<p>sfsad</p>\n",
  "image": "",
  "audio": "",
  "audioName": "",
  "hint": "",
  "isCorrect": true,
  "$$hashKey": "object:2173"
}
const playerInput = {
  "context": {
    "mode": "edit",
    "contentId": " ",
    "sid": "S2Fu6ETnItgAZqmsyEBhQ12qZHBHAp25",
    "uid": "659b011a-06ec-4107-84ad-955e16b0a48a",
    "channel": "012315809814749184151",
    "pdata": {
      "id": "staging.sunbird.portal",
      "ver": "1.12.0",
      "pid": "sunbird-portal.contenteditor"
    },
    "app": [],
    "dims": [],
    "partner": []
  },
  "config": {
    "repos": [
      "/sunbird-plugins/renderer"
    ],
    "plugins": [
      {
        "id": "org.sunbird.player.endpage",
        "ver": 1.1,
        "type": "plugin"
      }
    ],
    "splash": {
      "text": "",
      "icon": "",
      "bgImage": "assets/icons/splacebackground_1.png",
      "webLink": ""
    },
    "overlay": {
      "showUser": false
    },
    "showEndPage": false
  },
  "metadata": {
    "ownershipType": [
      "createdBy"
    ],
    "identifier": "do_21268178877426892814077",
    "audience": [
      "Learner"
    ],
    "code": "org.sunbird.25Rdwc",
    "visibility": "Default",
    "channel": "in.ekstep",
    "description": "Enter description for Resource",
    "language": [
      "English"
    ],
    "mediaType": "content",
    "mimeType": "application/vnd.ekstep.ecml-archive",
    "osId": "org.ekstep.quiz.app",
    "languageCode": "en",
    "createdOn": "2019-01-21T11:25:18.733+0000",
    "versionKey": "1548069918733",
    "framework": "NCF",
    "createdBy": "659b011a-06ec-4107-84ad-955e16b0a48a",
    "name": "tets",
    "lastUpdatedOn": "2019-01-21T11:25:18.733+0000",
    "contentType": "Resource",
    "status": "Draft",
    "resourceType": "Learn"
  },
  "data": {
    "theme": {
      "startStage": "splash",
      "id": "theme",
      "ver": 0.3,
      "stage": [
        {
          "id": "splash",
          "org.ekstep.questionset": {
            "x": 9,
            "y": 6,
            "w": 80,
            "h": 85,
            "isQuestionPreview": true,
            "org.ekstep.question": [
              {
                "id": "c943d0a907274471a0572e593eab49c2",
                "pluginId": "org.ekstep.questionunit.mcq",
                "pluginVer": "1.1",
                "templateId": "horizontalMCQ",
                "data": "{\"question\":{\"text\":\"<p>java ?</p>\\n\",\"image\":\"\",\"audio\":\"\",\"audioName\":\"\",\"hint\":\"\"},\"options\":[{\"text\":\"<p>jhdgas</p>\\n\",\"image\":\"\",\"audio\":\"\",\"audioName\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:1025\"},{\"text\":\"<p>sdf</p>\\n\",\"image\":\"\",\"audio\":\"\",\"audioName\":\"\",\"hint\":\"\",\"isCorrect\":false,\"$$hashKey\":\"object:1026\"},{\"text\":\"<p>fdywegfw</p>\\n\",\"image\":\"\",\"audio\":\"\",\"audioName\":\"\",\"isCorrect\":false,\"$$hashKey\":\"object:1036\"},{\"text\":\"<p>gfsjgfweys</p>\\n\",\"image\":\"\",\"audio\":\"\",\"audioName\":\"\",\"isCorrect\":false,\"$$hashKey\":\"object:1041\"}],\"questionCount\":0,\"media\":[]}",
                "config": "{\"metadata\":{\"max_score\":1,\"isShuffleOption\":false,\"isPartialScore\":true,\"templateType\":\"Horizontal\",\"name\":\"java ?\\n\",\"title\":\"java ?\\n\",\"medium\":\"English\",\"topic\":[],\"qlevel\":\"EASY\",\"gradeLevel\":[\"Other\"],\"subject\":\"English\",\"concepts\":[{\"identifier\":\"AI31\",\"name\":\"(Artificial) Neural Network\"}],\"board\":\"State (Karnataka)\",\"category\":\"MCQ\"},\"max_time\":0,\"max_score\":1,\"partial_scoring\":true,\"layout\":\"Horizontal\",\"isShuffleOption\":false,\"questionCount\":1}",
                "w": "80",
                "x": "9",
                "h": "85",
                "y": "6"
              }
            ]
          },
          "x": 0,
          "y": 0,
          "w": 100,
          "h": 100
        }
      ],
      "manifest": {
        "media": [
          [
            {
              "id": "org.ekstep.questionunit.renderer.audioicon",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/assets/audio-icon.png",
              "type": "image"
            },
            {
              "id": "org.ekstep.questionunit.renderer.downarrow",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/assets/down_arrow.png",
              "type": "image"
            },
            {
              "id": "a962e401-b012-458e-a4ec-75b95dc59954",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/components/js/components.js",
              "type": "js"
            },
            {
              "id": "9d32e24e-5ae9-476d-8684-a66b0ed1315c",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/components/css/components.css",
              "type": "css"
            },
            {
              "id": "d7820921-ab60-4d2e-8546-ae806327d523",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/libs/katex/katex.min.js",
              "type": "js"
            },
            {
              "id": "b50451ab-0c38-4294-8555-21a5eae83748",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/libs/katex/katex.min.css",
              "type": "css"
            },
            {
              "id": "532d55b1-03a4-4352-9584-09e1793d3ed5",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/libs/katex/fonts/katex_main-bold.ttf",
              "type": "js"
            },
            {
              "id": "80a53bdb-7ded-4182-b529-771eb23171b4",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/libs/katex/fonts/katex_main-bolditalic.ttf",
              "type": "js"
            },
            {
              "id": "5e34d05a-2aa0-494c-835b-98abb5d28595",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/libs/katex/fonts/katex_main-italic.ttf",
              "type": "js"
            },
            {
              "id": "7c00570c-43c0-4142-97e6-04cbeeab9672",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/libs/katex/fonts/katex_main-regular.ttf",
              "type": "js"
            },
            {
              "id": "769e02b9-2b78-40e8-873e-57b8ea5449ba",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/libs/katex/fonts/katex_math-bolditalic.ttf",
              "type": "js"
            },
            {
              "id": "0d48eac0-ee6d-470d-9386-e8cdbda7bac2",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/libs/katex/fonts/katex_math-italic.ttf",
              "type": "js"
            },
            {
              "id": "29b8a3b2-1802-49aa-8a57-317e609e8983",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/libs/katex/fonts/katex_math-regular.ttf",
              "type": "js"
            },
            {
              "id": "ded0b87b-a79b-4a13-8ea0-c95543248910",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/libs/katex/fonts/katex_size1-regular.ttf",
              "type": "js"
            },
            {
              "id": "9d8b3dd5-ac5a-441c-a008-8347a361c645",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/libs/katex/fonts/katex_size2-regular.ttf",
              "type": "js"
            },
            {
              "id": "8b767b62-b224-4d8a-abb5-ddeca73ccc5a",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/libs/katex/fonts/katex_size3-regular.ttf",
              "type": "js"
            },
            {
              "id": "44d6092b-7bae-4b18-98a0-851211933bc2",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/libs/katex/fonts/katex_size4-regular.ttf",
              "type": "js"
            },
            {
              "id": "org.ekstep.questionunit",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/renderer/plugin.js",
              "type": "plugin"
            },
            {
              "id": "org.ekstep.questionunit_manifest",
              "plugin": "org.ekstep.questionunit",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionunit-1.0/manifest.json",
              "type": "json"
            },
            {
              "id": "2ab83cb0-033e-4574-bd55-100c15e91305",
              "plugin": "org.ekstep.questionunit.mcq",
              "ver": "1.1",
              "src": "/content-plugins/org.ekstep.questionunit.mcq-1.1/renderer/styles/style.css",
              "type": "css"
            },
            {
              "id": "66c10bd2-2839-40ed-b7be-26202156aa71",
              "plugin": "org.ekstep.questionunit.mcq",
              "ver": "1.1",
              "src": "/content-plugins/org.ekstep.questionunit.mcq-1.1/renderer/styles/horizontal_and_vertical.css",
              "type": "css"
            },
            {
              "id": "ed850e6b-0966-4222-a367-9047dc7de50a",
              "plugin": "org.ekstep.questionunit.mcq",
              "ver": "1.1",
              "src": "/content-plugins/org.ekstep.questionunit.mcq-1.1/renderer/template/mcq-layouts.js",
              "type": "js"
            },
            {
              "id": "ac9a6422-5350-4177-a5a6-311e6b7d163b",
              "plugin": "org.ekstep.questionunit.mcq",
              "ver": "1.1",
              "src": "/content-plugins/org.ekstep.questionunit.mcq-1.1/renderer/template/template_controller.js",
              "type": "js"
            },
            {
              "id": "0b32bb56-3448-4350-beb7-68b4dd38bdb4",
              "plugin": "org.ekstep.questionunit.mcq",
              "ver": "1.1",
              "src": "/content-plugins/org.ekstep.questionunit.mcq-1.1//renderer/assets/tick_icon.png",
              "type": "image"
            },
            {
              "id": "5dc60356-eb46-4ac7-84be-780c4d923078",
              "plugin": "org.ekstep.questionunit.mcq",
              "ver": "1.1",
              "src": "/content-plugins/org.ekstep.questionunit.mcq-1.1//renderer/assets/audio-icon2.png",
              "type": "image"
            },
            {
              "id": "dc11340d-1e0b-4434-a01e-985e6954a47c",
              "plugin": "org.ekstep.questionunit.mcq",
              "ver": "1.1",
              "src": "/content-plugins/org.ekstep.questionunit.mcq-1.1//renderer/assets/music-blue.png",
              "type": "image"
            },
            {
              "id": "org.ekstep.questionunit.mcq",
              "plugin": "org.ekstep.questionunit.mcq",
              "ver": "1.1",
              "src": "/content-plugins/org.ekstep.questionunit.mcq-1.1/renderer/plugin.js",
              "type": "plugin"
            },
            {
              "id": "org.ekstep.questionunit.mcq_manifest",
              "plugin": "org.ekstep.questionunit.mcq",
              "ver": "1.1",
              "src": "/content-plugins/org.ekstep.questionunit.mcq-1.1/manifest.json",
              "type": "json"
            },
            {
              "id": "427e3c8b-851e-4a6b-a119-0d5a41aa44a1",
              "plugin": "org.ekstep.navigation",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.navigation-1.0/renderer/controller/navigation_ctrl.js",
              "type": "js"
            },
            {
              "id": "c232b160-7531-4ca1-b923-b4129105edd5",
              "plugin": "org.ekstep.navigation",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.navigation-1.0/renderer/templates/navigation.html",
              "type": "js"
            },
            {
              "id": "org.ekstep.navigation",
              "plugin": "org.ekstep.navigation",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.navigation-1.0/renderer/plugin.js",
              "type": "plugin"
            },
            {
              "id": "org.ekstep.navigation_manifest",
              "plugin": "org.ekstep.navigation",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.navigation-1.0/manifest.json",
              "type": "json"
            },
            {
              "id": "org.ekstep.questionset.quiz",
              "plugin": "org.ekstep.questionset.quiz",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionset.quiz-1.0/renderer/plugin.js",
              "type": "plugin"
            },
            {
              "id": "org.ekstep.questionset.quiz_manifest",
              "plugin": "org.ekstep.questionset.quiz",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionset.quiz-1.0/manifest.json",
              "type": "json"
            },
            {
              "id": "org.ekstep.iterator",
              "plugin": "org.ekstep.iterator",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.iterator-1.0/renderer/plugin.js",
              "type": "plugin"
            },
            {
              "id": "org.ekstep.iterator_manifest",
              "plugin": "org.ekstep.iterator",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.iterator-1.0/manifest.json",
              "type": "json"
            },
            {
              "id": "38aeaab6-2225-4ce1-ae68-7766e7a5c099",
              "plugin": "org.ekstep.questionset",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionset-1.0/renderer/utils/telemetry_logger.js",
              "type": "js"
            },
            {
              "id": "ac4b5726-3183-4738-8b20-432c2c409830",
              "plugin": "org.ekstep.questionset",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionset-1.0/renderer/utils/html_audio_plugin.js",
              "type": "js"
            },
            {
              "id": "b63184e5-7878-4cbe-b726-42baa2886643",
              "plugin": "org.ekstep.questionset",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionset-1.0/renderer/utils/qs_feedback_popup.js",
              "type": "js"
            },
            {
              "id": "org.ekstep.questionset",
              "plugin": "org.ekstep.questionset",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionset-1.0/renderer/plugin.js",
              "type": "plugin"
            },
            {
              "id": "org.ekstep.questionset_manifest",
              "plugin": "org.ekstep.questionset",
              "ver": "1.0",
              "src": "/content-plugins/org.ekstep.questionset-1.0/manifest.json",
              "type": "json"
            }
          ]
        ]
      },
      "plugin-manifest": {
        "plugin": [
          {
            "id": "org.ekstep.questionunit",
            "ver": "1.0",
            "type": "plugin",
            "depends": ""
          },
          {
            "id": "org.ekstep.questionunit.mcq",
            "ver": "1.1",
            "type": "plugin",
            "depends": "org.ekstep.questionunit"
          },
          {
            "id": "org.ekstep.navigation",
            "ver": "1.0",
            "type": "plugin",
            "depends": ""
          },
          {
            "id": "org.ekstep.questionset.quiz",
            "ver": "1.0",
            "type": "plugin",
            "depends": ""
          },
          {
            "id": "org.ekstep.iterator",
            "ver": "1.0",
            "type": "plugin",
            "depends": ""
          },
          {
            "id": "org.ekstep.questionset",
            "ver": "1.0",
            "type": "plugin",
            "depends": "org.ekstep.questionset.quiz,org.ekstep.iterator"
          }
        ]
      }
    }
  }
}

const questionData = {
  "data": {
    "plugin": {
      "id": "org.ekstep.questionunit.mcq",
      "version": "1.1",
      "templateId": "horizontalMCQ"
    },
    "data": {
      "question": {
        "text": "<p>test 1 </p>\n",
        "image": "",
        "audio": "",
        "audioName": "",
        "hint": ""
      },
      "options": [
        {
          "text": "<p>option 3</p>\n",
          "image": "",
          "audio": "",
          "audioName": "",
          "hint": "",
          "isCorrect": true,
          "$$hashKey": "object:2173"
        },
        {
          "text": "<p>option 2</p>\n",
          "image": "",
          "audio": "",
          "audioName": "",
          "hint": "",
          "isCorrect": false,
          "$$hashKey": "object:2174"
        },
        {
          "text": "<p>option 4</p>\n",
          "image": "",
          "audio": "",
          "audioName": "",
          "hint": "",
          "isCorrect": false,
          "$$hashKey": "object:2174"
        }
      ],
      "questionCount": 0,
      "media": []
    },
    "config": {
      "metadata": {
        "max_score": 1,
        "isShuffleOption": false,
        "isPartialScore": true,
        "evalUnordered": false,
        "templateType": "Horizontal",
        "name": "asliuqigdusg\n",
        "title": "asliuqigdusg\n",
        "board": "CBSE",
        "topic": [],
        "medium": "English",
        "gradeLevel": [
          "KG"
        ],
        "subject": "Mathematics",
        "qlevel": "EASY",
        "category": "MCQ"
      },
      "max_time": 0,
      "max_score": 1,
      "partial_scoring": true,
      "layout": "Horizontal",
      "isShuffleOption": false,
      "questionCount": 1,
      "evalUnordered": false
    },
    "media": []
  }
}
const iframeSrc = document.getElementById('contentPlayer');

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
        // app.helpers.showQuestion(question, false);
        if (initializedPlayer) {
          iframeSrc.contentWindow.initializePreview(playerInput);
        } else {
          app.helpers.initPlayer(playerInput)
        }
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
        if (question.multiMedia && question.multiMedia.type === 'img') {
          var imgTag = `<img width="400" height="200" src=${question.multiMedia.link} alt="Smiley face" height="42" width="42">`
          html = html + imgTag;
        } else if (question.multiMedia && question.multiMedia.type === 'youtube') {
          const youtube = `<iframe width="400" height="200" src="https://www.youtube.com/embed/DL1HHrrhMbs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
          html = html + youtube + `<div class="youtube-played">
            <button type="submit">Resume game</button>
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
    initPlayer : function(playerData){
      const iFrameUrl = './../preview/preview.html';
      iframeSrc.src = iFrameUrl;
      iframeSrc.onload = () => {
        initializedPlayer = true;
        const playerWidth = $('#contentPlayer').width();
        if (playerWidth) {
          const height = playerWidth * (9 / 16);
          $('#contentPlayer').css('height', height + 'px');
        }
        iframeSrc.contentWindow.initializePreview(playerData);
      };
    },
    // Update number of online users in the current room
    // This method MUST be called after adding, or removing list element(s)
    updateNumOfUsers: function() {
      var num = $('.users-list ul li').length;
      $('.chat-num-users').text(num + " User(s)");
    }
  }
};