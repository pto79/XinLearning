angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('QuestionlistsCtrl', function($scope, $ionicModal, questionService) {
  $scope.questionData = {};
  $scope.questionData.weight = 10;
  $scope.questionData.level = 'K2';
  $scope.questionData.subject = 'english';
  $scope.questionData.category = 'vocabulary';


    $scope.playAudio = function(sound) {
        var audio = new Audio(sound);
        audio.play();
    };

    function generateQuestion() {
      var total_weight = 0;
      var random_pick = 0;

      $scope.questionlist = questionService.all();
      console.log($scope.questionlist);

      for (var i = 0; i < $scope.questionlist.length; i++) {
          total_weight += $scope.questionlist[i].weight;
      }
      console.log(total_weight);
      random_pick = Math.floor((Math.random() * total_weight) + 1);
      console.log(random_pick);
      for (var i = 0; i < $scope.questionlist.length; i++) {

          random_pick -= $scope.questionlist[i].weight;
          if(random_pick <= 0) {
            $scope.question = $scope.questionlist[i];
            /*
              $scope.words = [];
              for (var i = 0; i < $scope.question.topic.length; i++) {
                $scope.words.push($scope.question.topic[i]);
              }
              console.log($scope.words);
            */
            break;
          }

      }
    }

    generateQuestion();

    $scope.next = function() {
      generateQuestion();
    }


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/question.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeQuestion = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.openQuestion = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.addQuestion = function() {
    console.log($scope.questionData);
    questionService.add($scope.questionData);
    questionService.save();
    generateQuestion();
    $scope.modal.hide();
  };

  $scope.correct = function() {
    if($scope.question.weight > 1)
      $scope.question.weight -= 1;
    questionService.set($scope.question);
    questionService.save();
    generateQuestion();
  }

  $scope.wrong = function() {
    $scope.question.weight += 1;
    questionService.set($scope.question);
    questionService.save();
    generateQuestion();
  }

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('BrowseCtrl', function($scope, questionService) {
  $scope.$on('$ionicView.beforeEnter', function(e) {
      $scope.questionlist = questionService.all();
  });

  $scope.remove = function(question) {
    questionService.remove(question);
    questionService.save();
  }
})

;
