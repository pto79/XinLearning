angular.module('starter.services', [])

.factory('questionService', function() {
  // Might use a resource here that returns a JSON array
  var questions = localStorage.getItem('questions');
  if(questions == undefined || questions == null  || questions == "")
    questions = '[]';
  questions = JSON.parse(questions);

  return {
    all: function() {
      return questions;
    },
    save: function() {
      localStorage.setItem('questions', JSON.stringify(questions));
    },
    export: function() {
      return localStorage.getItem('questions');
    },
    import: function(data) {
      questions = JSON.parse(data);
      localStorage.setItem('questions', data);
    },
    add: function(question) {
      questions.push(question);
    },
    remove: function(question) {
      questions.splice(questions.indexOf(question), 1);
    },
    get: function(question) {
      return questions[questions.indexOf(question)];
    },
    set: function(question) {
      questions[questions.indexOf(question)] = question;
    }
  };
})

;