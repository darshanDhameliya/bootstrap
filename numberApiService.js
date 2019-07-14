var numberApiApp = angular.module('numberApi.app', []);
numberApiApp.factory('numberApiFactory', ['$q', '$http', function($q, $http) {
    var myObj = {};
    myObj.getfact = function(number) {
        return $q(function(resolved, rejected) {
            $http.get("http://numbersapi.com/" + number)
                .then(function(response) {
                    resolved(response.data);
                })
                .catch(function(error) {
                    rejected(error);
                });
        });
    };
    return myObj;
}]);
numberApiApp.controller('numberApiController', ['$scope', 'numberApiFactory', function($scope, numberApiFactory) {
    $scope.getNumberApiResult = function() {
        numberApiFactory.getfact($scope.number)
            .then(function(response) {
                $scope.answerNumberApi = response;
            });
    };
}]);