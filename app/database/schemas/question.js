'use strict';

var Mongoose = require('mongoose');

/**
 * Each connection object represents a user connected through a unique socket.
 * Each connection object composed of {userId + socketId}. Both of them together are unique.
 *
 */
var QuestionSchema = new Mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  options: { type: [{ val: String, text: String, _id: { id: false } }] },
  createdAt: { type: Date, default: Date.now }
});

var questionModel = Mongoose.model('question', QuestionSchema);

module.exports = questionModel;
