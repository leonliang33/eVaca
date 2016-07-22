//var application = requires('./application.js')

angular.module('app.controllers', ['app.services'])

.controller('loginCtrl', ['$scope','login','$http','$state','$q',loginController])

.controller('signUpCtrl', ['$scope','signUp','$http','$state','$q',signupController])

.controller('resetPasswordCtrl', ['$scope','resetpassword','$http','$state','$q',resetPasswordController])

.controller('plannerCtrl', ['$scope','planner','$http','$state','$q',plannerController])

.controller('verifcationCodeCtrl', ['$scope','verificationcode','$http','$state','$q',verificationCodeController])

.controller('newPasswordCtrl',['$scope', 'newPassword', '$http', '$state', '$q',newPasswordController])


.controller('eVacaCtrl', function($scope, $http, $ionicPopup, $state, planner) {
	$http.get('http://localhost:8420/main').then(function(response) {
		$scope.planners = response.data;
	});

	$scope.$watch(function() {
		return planner.getNewPlanner();
	}, function(planner) {
		console.log(planner);
		if (planner !== null) {
			$scope.planners.push(planner);
		}
	});

	$scope.getPlannerEvents = function(id) {
		$state.go('thingsToDo', {
			plannerId: id
		});
	};
	var title = 'Delete trip';
	var template = 'Are you sure you want to delete this trip?';
	itemRemoval($scope, $ionicPopup, title, template);
})

.controller('historyCtrl', function($scope) {

})

.controller('thingsToDoCtrl', function($scope, $http, $stateParams, $ionicPopup) {
	$http.get('http://localhost:8420/events', {
			params: {
				plannerId: $stateParams.plannerId
			}
		})
		.then(function(response) {
				$scope.events = response.data;
		});
	var title = 'Delete event';
	var template = 'Are you sure you want to delete this event?';
	itemRemoval($scope, $ionicPopup, title, template);
})

.controller('accountPreferencesCtrl', function($scope) {

})

function itemRemoval($scope, $ionicPopup, title, template) {
	$scope.remove = function(item) {
		var confirmPopup = $ionicPopup.confirm({
			title: title,
			template: template
		});
		confirmPopup.then(function(res) {
			if (res) { // Deletion confirmed
				if ('location' in item) { // Planner removal
					console.log('removing planner');
					var plannerIndex = $scope.planners.indexOf(item);
					$scope.planners.splice(plannerIndex, 1);
					// Http delete request to delete planner here
				} else {
					console.log('removing event');
					var eventIndex = $scope.events.indexOf(item);
					$scope.events.splice(eventIndex, 1);
					// Http delete to delete event here
				}
			} else {
				console.log('Deletion canceled');
			}
		});
	};
}

function resetPasswordController($scope, resetpassword, $http, $state, $q){
     var vm = this;

     console.log("resetPasswordController Active");

     $scope.getemail = function(){
          console.log("ENTER CALLED");
          var email = this.formdata.email;

          var vbool;
               vbool = resetPassword.getEmail(email).then(function(data){
                    vbool= data;
                    if(vbool == "true")
                    {
                         $state.go('newPassword');
                    }
                    else{
                         $state.reload();
                    }

               });
     }
};

function verificationCodeController($scope, verificationcode, $http, $state, $q){
     var vm = this;

     console.log("VERIFICATIONCODE Active");

     $scope.verifycode = function(){
          console.log("VERIFY CALLED");
          var code = this.formdata.code;

          var verifybool;
               verifyvbool = verificationcode.getCode(code).then(function(data){
                    verifybool= data;
                    if(verifybool == "true")
                    {
                         $state.go('tabsController.planner');
                    }
                    else{
                         $state.reload();
                    }

               });
     }
};



function plannerController($scope,planner,$http,$state,$q){
     var pm = this;
     console.log("PLANNER CONTROLLER ACTIVE");
     $scope.formData = {};
     $scope.plan = function(){
          console.log("PLANNER Called");
          var location = this.formdata.location;
          var budget = this.formdata.budget;
          var sdate = this.formdata.sdate;
          var rdate = this.formdata.rdate;
          var ideal_vacation = this.formdata.ivacation;
          planner.getPlanner(location, budget, sdate, rdate, ideal_vacation).then(function(data) {
          	if ('_id' in data) {
          		$state.go('thingsToDo', {
          			newPlanner: 'true',
          			planner: data,
          			plannerId: data._id
          		});
          	} else {
          		$state.reload();
          	}
          });
     }
};


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
                    if(log_bool){
                         console.log(log_bool);
                         $state.go('tabsController.eVaca');
                    }else{
                         console.log(log_bool);
                         $state.reload();
                    }
               });

     }
};

function newPasswordController($scope, newPassword, $http, $state, $q){
     var np = this;
     console.log("NEW password controller active");

     $scope.changePass = function(){
          console.log("CHANGPASSWORD CALLED");
          var vcode=this.formdata.vcode;
          var pass1 = this.formdata.pass1;
          var pass2 = this.formdata.pass2;

          var passbool;
               passbool = newPassword.getnewPass(vcode,pass1,pass2).then(function(data){
                    passbool = data;
                    console.log(passbool);
                    if(passbool == "true"){
                         $state.go('login');
                    }else{
                         $state.reload();
                    }
               });
     }
};


function signupController($scope,signUp,$http,$state,$q){
     var sm = this;
     console.log("SIGNUP CONTROLLER ACTIVE");

     $scope.signup = function(){
          console.log("SIGNUP CALLED");
          console.log(this.formdata.email);
          var name = this.formdata.name;
          var em = this.formdata.email;
          var pass=this.formdata.log_pass;


          var sign_bool;
               sign_bool=signUp.note(name,em,pass).then(function(data){
                    sign_bool = data;
                    console.log(sign_bool);
                    if(sign_bool){
                         console.log(sign_bool);
                         $state.go('verifcationCode');
                    }else{
                         console.log(sign_bool);
                         $state.reload();
                    }
               });

     }
};
