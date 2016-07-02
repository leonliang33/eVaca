//var application = requires('./application.js')

angular.module('app.controllers', ['app.services'])

.controller('loginCtrl', ['$state','login',loginController])



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

function loginController($state,login){
     //console.log($scope.log_email);
     //login;
     var vm = this;
     console.log("LOGIN CONTROLLER ACTIVE");
     console.log(vm.log_email + vm.log_pass);
     vm.enter = function(){
          console.log("ENTER CALLED");
          login.note(vm.log_email, vm.log_pass);
     }
};
