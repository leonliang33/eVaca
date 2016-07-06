//var application = requires('./application.js')

angular.module('app.controllers', ['app.services'])

.controller('loginCtrl', ['$scope','login','$http','$state',loginController])



.controller('eVacaCtrl', function($scope) {

})

.controller('historyCtrl', function($scope) {

})

.controller('thingsToDoCtrl', function($scope) {

})

.controller('signUpCtrl', function($scope) {

})

.controller('plannerCtrl', function($scope) {

})

.controller('verifcationCodeCtrl', function($scope) {

})

.controller('resetPasswordCtrl', function($scope) {

})

.controller('locationsCtrl', function($scope) {

})

.controller('newPasswordCtrl', function($scope) {

})

.controller('accountPreferencesCtrl', function($scope) {

})

function loginController($scope,login,$http,$state){
     //console.log($scope.log_email);
     //login;
     var vm = this;
     console.log("LOGIN CONTROLLER ACTIVE");
     console.log(vm.log_email + vm.log_pass);

     $scope.enter = function(){
          console.log("ENTER CALLED");
          $state.go('tabsController.eVaca');
          var log_bool = login.note(vm.log_email, vm.log_pass);
          console.log(log_bool);
          if(!log_bool){
               $state.reload();
          }else{
               $state.go('tabsController.eVaca');
          }
     }
};
