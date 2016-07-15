//var application = requires('./application.js')

angular.module('app.controllers', ['app.services'])

.controller('loginCtrl', ['$scope','login','$http','$state','$q',loginController])



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

function loginController($scope,login,$http,$state,$q){
     //console.log($scope.log_email);
     //login;
     var vm = this;
     console.log("LOGIN CONTROLLER ACTIVE");
     //console.log(this.formdata.log_email +" "+ this.formdata.log_pass);

     $scope.enter = function(){
          console.log("ENTER CALLED");
          console.log(this.formdata.log_email);
          var em =this.formdata.log_email;
          var pass=this.formdata.log_pass;
          //$state.go('tabsController.eVaca');
          var log_bool;
          //setTimeout(function(em,pass){
               log_bool=login.note(em,pass).then(function(data){
                    log_bool = data;
                    console.log(log_bool);
                    if(log_bool == "true"){
                         console.log(log_bool);
                         $state.go('tabsController.eVaca');
                    }else{
                         console.log(log_bool);
                         $state.reload();
                    }
               });
          //},200);
          // log_bool.then(function(result){
          //      console.log(result);
          //      if(result){
          //           $state.go('tabsController.eVaca');
          //      }else{
          //           $state.reload();
          //      }
          // })

     }
};
