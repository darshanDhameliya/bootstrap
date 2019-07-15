 var studentLib = angular.module("studentLib", []);

 studentLib.factory('studentSerivce', ['$q', '$http', function($q, $http) {
     var studentSerivce = {};
     var url = 'http://gsmktg.azurewebsites.net:80/api/v1/techlabs/test/students/'
     studentSerivce.getStudentList = function() {
         return $q(function(resolved, rejected) {
             $http.get(url)
                 .then(function(dataObject) {
                     resolved(dataObject.data);
                 }, function(dataObject) {
                     rejected(dataObject);
                     console.log("Error : " + dataObject);
                 });
         })
     };
     studentSerivce.addStudentData = function(studentJson) {
         return $q(function(resolved, rejected) {
             $http.post(url, studentJson)
                 .then(function() {
                     console.log("Data add successfully");
                     window.location = 'index.html';
                 })
                 .catch(function(data, status, header, config) {
                     console.log("Error : " + header);
                 });
         })
     };
     studentSerivce.editStudentData = function(studentId, studentJson) {
         return $q(function(resolved, rejected) {
             $http.put(url + studentId, studentJson)
                 .then(function() {
                     console.log("Data edit successfully");
                     window.location = 'index.html';
                 })
                 .catch(function(data, status, header, config) {
                     console.log("Error : " + header);
                 });
         })
     };


     studentSerivce.deleteStudentData = function(studentId) {
         return $q(function(resolved, rejected) {
             $http.delete(url + studentId)
                 .then(function() {
                     console.log("Data delete successfully");
                     window.location = 'index.html';
                 })
                 .catch(function(data, status, header, config) {
                     console.log("Error : " + header);
                 });
         })
     };
     studentSerivce.getStudent = function(studentId) {
         return $q(function(resolved, rejected) {
             $http.get(url + studentId)
                 .then(function(dataObject) {
                     resolved(dataObject.data);
                 }, function(dataObject) {
                     rejected(dataObject);
                     console.log("Error : " + dataObject);
                 });
         })
     };
     return studentSerivce;
 }])