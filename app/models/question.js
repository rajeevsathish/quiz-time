'use strict';

var questionPool = [{
  question: "World Health day is observed on?",
  multiMedia: {type: 'img', link: 'https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  answer: "A",
  options: { A: "3rd April", B: "3rd June", C: "3rd May", D: "3rd November" }
}, {
  question: "Which among the following bodies estimates the national income of India?",
  multiMedia: {type: 'youtube', link: 'https://www.youtube.com/watch?v=DL1HHrrhMbs' },
  answer: "C",
  options: { A: "Office of the Economic Advisor", B: "Ministry of Statistics", C: "Central Statistical Office", D: "Ministry of Finance" }
}, {
  question: "What is the name of India’s first nuclear reactor?",
  answer: "B",
  options: { A: "Cirius", B: "Apsara", C: "Dhruva", D: "Kamini" }
}, {
  question: "The western ghats in Maharashtra is known as...?",
  answer: "B",
  options: { A: "Nilgiris", B: "Sahyadris", C: "Cardamon Hills", D: "Annamalai" }
}, {
  question: "Which state is known as India's Spice Garden...?",
  answer: "A",
  options: { A: "Kerala", B: "Karnataka", C: "Bihar", D: "Uttaranchal" }
}];

var getQuestionNumber = function(num, callback) {
  num = num % questionPool.length;
  return callback(null, questionPool[num]);
}

module.exports = {
  getQuestionNumber
};