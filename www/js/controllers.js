angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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

.controller('QuestionlistsCtrl', function($scope) {
  $scope.questionlist = [
    {
      level: 'K2',
      subject: 'english',
      category: 'spelling',
      topic: 'apple',
      image: 'http://www.pngmart.com/files/1/Apple-Fruit.png',
      sound: 'https://dictionary.cambridge.org/media/english-chinese-simplified/us_pron/a/app/apple/apple.mp3',
      answer: 'apple',
      weight: 5
    },
    {
      level: 'K2',
      subject: 'english',
      category: 'spelling',
      topic: 'orange',
      image: 'http://www.pngmart.com/files/1/Apple-Fruit.png',
      sound: 'https://dictionary.cambridge.org/media/english-chinese-simplified/us_pron/a/app/apple/apple.mp3',
      answer: 'orange',
      weight: 6
    },
    {
      level: 'K2',
      subject: 'english',
      category: 'spelling',
      topic: 'watermelon',
      image: 'http://www.pngmart.com/files/1/Apple-Fruit.png',
      sound: 'https://dictionary.cambridge.org/media/english-chinese-simplified/us_pron/a/app/apple/apple.mp3',
      answer: 'watermelon',
      weight: 10
    },
    {
      level: 'K2',
      subject: 'english',
      category: 'spelling',
      topic: 'banana',
      image: 'http://www.pngmart.com/files/1/Apple-Fruit.png',
      sound: 'https://dictionary.cambridge.org/media/english-chinese-simplified/us_pron/a/app/apple/apple.mp3',
      answer: 'banana',
      weight: 6
    }
  ];

    $scope.playAudio = function(sound) {
        var audio = new Audio(sound);
        audio.play();
    };

    function generateQuestion() {
      var total_weight = 0;
      var random_pick = 0;
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
          $scope.words = [];
          for (var i = 0; i < $scope.question.topic.length; i++) {
            $scope.words.push($scope.question.topic[i]);
          }
          console.log($scope.words);
          break;
        }
      }
    }

    generateQuestion();

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
