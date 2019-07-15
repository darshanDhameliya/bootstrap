var studentServiceApp = angular.module("studentService.app", ['ngRoute', 'studentLib']).config(['$routeProvider',
    function($routeProvider) {


        $routeProvider
            .when("/", {
                templateUrl: "fragments/home.html",
                controller: "homeController"
            })
            .when("/addStudent", {
                templateUrl: "fragments/addStudent.html",
                controller: "addStudentController"
            })
            .when("/editStudent/:studentId", {
                templateUrl: "fragments/editStudent.html",
                controller: "editStudentController"
            })

        .otherwise({ redirectTo: "/" })
    }
]);
studentServiceApp.controller('homeController', ['$scope', 'studentSerivce',
    function($scope, studentSerivce) {
        var studentdata = [];
        var promise;
        promise = studentSerivce.getStudentList();
        promise.then(function(studentData) {
            $scope.studentList = studentData;
        }, function(studentData) {
            console.log("Error : " + studentData);
        })

        $scope.deleteStudentdata = function(studentId) {
            studentSerivce.deleteStudentData(studentId);
        };
    }
]);

studentServiceApp.controller('addStudentController', ['$scope', 'studentSerivce', function($scope, studentSerivce) {
    console.log("add student controller");

    $scope.addStudentData = function() {
        console.log('add data');

        if (isNonEmptyInputField([$scope.rollNumber,
                $scope.name, $scope.age, $scope.email, $scope.date, $scope.isMale
            ])) {
            $scope.inputError = "";
            studentSerivce.addStudentData({
                "rollNo": $scope.rollNumber,
                "name": $scope.name,
                "age": $scope.age,
                "email": $scope.email,
                "date": $scope.date,
                "isMale": $scope.isMale
            });
        }
    }

    function isNonEmptyInputField(list) {
        console.log(list);

        for (let index = 0; index < list.length; index++) {
            if (!list[index]) {
                $scope.inputError = "Fill all the details";
                return false;
            }
        }
        return true;
    }

}]);

studentServiceApp.controller('editStudentController', ['$scope', 'studentSerivce', '$routeParams', function($scope, studentSerivce, $routeParams) {
    console.log("edit student controller");
    var studentId = $routeParams.studentId;
    var promise = studentSerivce.getStudent(studentId);
    promise.then(function(studentData) {
        var student = studentData[0];
        $scope.name = student.name;
        $scope.rollNumber = student.rollNo;
        $scope.age = student.age;
        $scope.email = student.email;
        $scope.date = student.date;
        $scope.isMale = student.isMale;
    }, function(studentData) {
        console.log("Error : " + studentData);
    })
    $scope.editStudentData = function() {
        console.log('edit data');

        if (isNonEmptyInputField([$scope.rollNumber,
                $scope.name, $scope.age, $scope.email, $scope.date, $scope.isMale
            ])) {

            $scope.inputError = "";

            studentSerivce.editStudentData(studentId, {
                "rollNo": $scope.rollNumber,
                "name": $scope.name,
                "age": $scope.age,
                "email": $scope.email,
                "date": $scope.date,
                "isMale": $scope.isMale
            });
        }
    }

    function isNonEmptyInputField(list) {
        for (let index = 0; index < list.length; index++) {
            if (!list[index]) {
                $scope.inputError = "Fill all the details";
                return false;
            }
        }
        return true;
    }
}]);