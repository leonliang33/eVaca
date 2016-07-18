//var application = requires('./application.js')

angular.module('app.controllers', ['app.services'])

.controller('loginCtrl', ['$scope','login','$http','$state','$q',loginController])

.controller('signUpCtrl', ['$scope','signUp','$http','$state','$q',signupController])


.controller('eVacaCtrl', function($scope) {

})

.controller('historyCtrl', function($scope) {

})

.controller('thingsToDoCtrl', function($scope) {

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
/*function resetPasswordController($scope, resetPassword, $http, $state, $q){
     var vm = this;

     console.log("resetPasswordController Active");

     $scope.enter = function(){
          console.log("ENTER CALLED");
          var email = this.formdata.email;
          var bool;
               bool = resetPassword.verifyToken(email).then(function(data)){
                    bool= data;
                    
               }
     }
}*/
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
          var log_bool;
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

     }
};


function signupController($scope,signUp,$http,$state,$q){
     var sm = this;
     console.log("SIGNUP CONTROLLER ACTIVE");

     $scope.signup = function(){
          console.log("ENTER CALLED");
          console.log(this.formdata.email);
          console.log(this.formdata.security);
          var name = this.formdata.name;
          var em = this.formdata.email;
          var pass=this.formdata.log_pass;
          var secu = this.formdata.security;
          var sec_ans = this.formdata.sec_ans;

          var sign_bool;
               sign_bool=signUp.note(name,em,pass,secu,sec_ans).then(function(data){
                    sign_bool = data;
                    console.log(sign_bool);
                    if(sign_bool == "true"){
                         console.log(sign_bool);
                         $state.go('verifcationCode');
                    }else{
                         console.log(sign_bool);
                         $state.reload();
                    }
               });

     }
};