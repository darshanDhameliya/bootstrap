var miniSpaApp = angular.module('miniSpa.app', ['ngRoute']);
miniSpaApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'fragments/home.html',
            controller: 'homeController'
        })
        .when('/politics', {
            templateUrl: 'fragments/politics.html',
            controller: 'politicsController'
        })
        .when('/geography', {
            templateUrl: 'fragments/geography.html',
            controller: 'geographyController'
        });
}]);
miniSpaApp.controller('homeController', ['$scope', function($scope) {
    $scope.message = "Home Page";
}]);
miniSpaApp.controller('politicsController', ['$scope', function($scope) {
    $scope.message = "Politics Page";
}]);
miniSpaApp.controller('geographyController', ['$scope', function($scope) {
    $scope.message = "geography Page";
}]);