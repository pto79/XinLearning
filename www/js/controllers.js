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

.controller('SubjectsCtrl', function($scope, questionService) {

  var questionlist = questionService.all();
  
  $scope.subjects = [
    { title: 'Chinese', id: 1, num: 0 },
    { title: 'English', id: 2, num: 0 },
    { title: 'Math', id: 3, num: 0 },
    { title: 'Science', id: 4, num: 0 }
  ];
  
  for (let i=0; i<questionlist.length; i++) {
	if (questionlist[i].subject == 'Chinese') {
		var index = $scope.subjects.findIndex(x => x.title == 'Chinese');
		$scope.subjects[index].num += 1;
	}
	if (questionlist[i].subject == 'Englist') {
		var index = $scope.subjects.findIndex(x => x.title == 'English');
		$scope.subjects[index].num += 1;
	}
	if (questionlist[i].subject == 'Math') {
		var index = $scope.subjects.findIndex(x => x.title == 'Math');
		$scope.subjects[index].num += 1;
	}
	if (questionlist[i].subject == 'Science') {
		var index = $scope.subjects.findIndex(x => x.title == 'Science');
		$scope.subjects[index].num += 1;
	}
  }
})

.controller('QuestionlistCtrl', function($scope, $stateParams, $ionicModal, questionService) {
	
	$scope.id = $stateParams.subjectId;
	switch ($scope.id) {
		case '1':
			$scope.subject = "Chinese";
			break;
		case '2':
			$scope.subject = "Englist";
			break;
		case '3':
			$scope.subject = "Math";
			break;
		case '4':
			$scope.subject = "Science";
			break;
		default:
			console.log("invalid subject.");
			break;
	}
	
    $scope.playAudio = function(sound) {
        var audio = new Audio(sound);
        audio.play();
    };
	
    $scope.questionlist = questionService.all();
    console.log($scope.questionlist);

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

    //generateQuestion();
	$scope.questions = [];
	for (let i=0; i<$scope.questionlist.length; i++) {
		if($scope.questionlist[i].subject == $scope.subject)
			$scope.questions.push($scope.questionlist[i]);
	}

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
    $scope.questionData = {};
    $scope.questionData.weight = 10;
    $scope.questionData.level = 'P4';
    $scope.questionData.subject = 'Math';
    $scope.questionData.category = 'vocabulary';
	$scope.questionData.topic = 'question1';
	$scope.questionData.selection1 = 'selection 1';
	$scope.questionData.selection2 = 'selection 2';
	$scope.questionData.selection3 = 'selection 3';
	$scope.questionData.selection4 = 'selection 4';
	$scope.questionData.answer = 'answer to question 1';
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

.controller('QuestionCtrl', function($scope, $stateParams) {

})

.controller('SettingsCtrl', function($scope, $ionicModal, $ionicPopup, questionService) {

  $ionicModal.fromTemplateUrl('templates/modal-import.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalImport = modal;
  });

  $scope.exportData = function() {
    var copyText = document.getElementById("myClipboard");
    copyText.type = "text";
    copyText.value = questionService.export();
    copyText.select();
    document.execCommand("Copy");
    alert("Asset data has copied to clipboard");
    copyText.type = "hidden";
  }

  $scope.importData = function() {
    $scope.importData.data = "";
    $scope.modalImport.show();
  }  

  $scope.closeModalImport = function() {
    $scope.modalImport.hide();
  }

  $scope.saveData = function(data) {
    $ionicPopup.confirm({
      title: 'Warning!',
      template: 'Are you sure to overwrite the current question data?'
    }).then(function(res){
      if(res) {
        questionService.import(data);
        $scope.modalImport.hide();
      }
      else
        console.log("never mind");
    });
  }

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
