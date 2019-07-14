var BALL_START_NUMBER = 1;
var TOTAL_BALLS = 50;
var answer;
var selectedButtonNumber;

var blueBallApp = angular.module("BlueBall.app", []);
blueBallApp.controller("Game", ["$scope", "$timeout", function($scope, $timeout) {
    $scope.chances = 3;
    $scope.isVisibleRulesMenu = true;
    $scope.isVisiblePlayBoard = false;
    $scope.gameStatus = "in-progress";
    $scope.rules = ['You will get only three chances',
        'If you guess lower number than expected the balls will turn green',
        'If you guess Higher number than expected the balls will turn run'
    ];
    $scope.startGame = function() {
        $scope.isVisibleRulesMenu = false;
        $scope.isVisiblePlayBoard = true;
        loadBalls();
    };
    $scope.processPlayerInput = function(event) {
        checkAnswer(event.target.id);
        checkGameOver();

        $scope.chances--;
    };
    var checkGameOver = function() {
        if ($scope.chances <= 1)
            $scope.gameStatus = "game over";

    };
    var checkAnswer = function(number) {
        if (number == answer) {
            $scope.balls[number - 1].style.backgroundColor = '#2e86d9';
            $scope.gameStatus = "win";
        }
        if (number < answer)
            $scope.balls[number - 1].style.backgroundColor = '#34a84f';
        if (number > answer)
            $scope.balls[number - 1].style.backgroundColor = '#f22440';

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