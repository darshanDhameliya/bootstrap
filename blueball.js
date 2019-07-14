var BALL_START_NUMBER = 1;
var TOTAL_BALLS = 50;
var answer;
var selectedButtonNumber;

var blueBallApp = angular.module("BlueBall.app", []);
blueBallApp.controller("Game", ["$scope", "$timeout", function($scope, $timeout) {
    $scope.isVisibleRulesMenu = true;
    $scope.isVisiblePlayBoard = false;
    $scope.rules = ['You will get only three chances',
        'If you guess lower number than expected the balls will turn green',
        'If you guess Higher number than expected the balls will turn run'
    ];
    $scope.startGame = function() {
        $scope.isVisibleRulesMenu = false;
        $scope.isVisiblePlayBoard = true;
        loadBalls();
    };
    $scope.setColor = function(event) {
        selectedButtonNumber = event.target.id - 1;
        $scope.balls[selectedButtonNumber].style.backgroundColor = checkAnswer(event.target.id);
    };

    var checkAnswer = function(number) {
        if (number < answer)
            return '#34a84f';
        if (number > answer)
            return '#f22440';
        return '#2e86d9';
    };
    var loadBalls = function() {
        answer = Math.floor(Math.random() * TOTAL_BALLS) + 1;
        console.log("Answer is : " + answer);

        $scope.balls = [];
        for (let index = BALL_START_NUMBER; index <= TOTAL_BALLS; index++) {
            $scope.balls.push({ number: index, style: { backgroundColor: 'gray' } });
        }
    }
}]);