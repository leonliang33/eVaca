//var application = requires('./application.js')

angular.module('app.controllers', ['app.services'])

.controller('loginCtrl', ['$scope','login','$http','$state','$q',loginController])

.controller('signUpCtrl', ['$scope','signUp','$http','$state','$q',signupController])

.controller('resetPasswordCtrl', ['$scope','signUp','$http','$state','$q',resetPasswordController])


.controller('plannerCtrl', ['$scope','planner','$http','$state','$q',plannerController])

.controller('eVacaCtrl', function($scope, $http, $state) {
	$http.get('/main').then(function(response) {
		$scope.planners = response.data;
	});

	$scope.getPlannerEvents = function(id) {
		$state.go('thingsToDo', {
			plannerId: id
		});
	}
})

.controller('verifcationCodeCtrl', function($scope) {

})

.controller('historyCtrl', function($scope) {

})

.controller('thingsToDoCtrl', function($scope, $http, $stateParams) {
	$http.get('/events', {
			params: {
				plannerId: $stateParams.plannerId
			}
		})
		.then(function(response) {
			$scope.events = response.data;
		});
})

.controller('resetPasswordCtrl', function($scope) {

})

.controller('newPasswordCtrl', function($scope) {

})

.controller('accountPreferencesCtrl', function($scope) {

})

function resetPasswordController($scope, resetpassword, $http, $state, $q){
     var vm = this;

     console.log("resetPasswordController Active");

     $scope.getemail = function(){
          console.log("ENTER CALLED");
          var email = this.formdata.email;

          var vbool;
               vbool = resetPassword.getEmail(email).then(function(data){
                    vbool= data;
                    if(vbool = "true")
                    {
                         $state.go('newPassword');
                    }
                    else{
                         $state.reload();
                    }

               });
     }
};

function plannerController($scope,login,$http,$state,$q){
     var pm = this;
     console.log("PLANNER CONTROLLER ACTIVE");

//var occassion = this.formdata.occassion;


     $scope.plan = function(){
          console.log("Enter Called");
          var location = this.formdata.location;
          var budget = this.formdata.budget;
          var occassion = this.formdata.occassion;
          var age = this.formdata.age;
          var sdate = this.formdata.sdate;
          var rdate = this.formdata.rdate;
          var ideal_vacation = this.formdata.ivacation;
          var plan_bool;
             plan_bool = login.planners(location,budget,occassion,age,sdate,ldate,ideal_vacation).then(function(data){
               plan_bool = data;
               console.log(log_bool);
               if(plan_bool == "true"){
                    $state.go('thingsToDo');
               }else{
                    $state.reload();
               }
             })
     }
}



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
