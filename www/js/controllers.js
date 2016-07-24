//var application = requires('./application.js')

angular.module('app.controllers', ['app.services'])

.controller('plannerCtrl', ['$scope','planner','$http','$state','$q',plannerController])

.controller('loginCtrl', function($scope, $http, $state) {
    $scope.enter = function() {
        $http.post('http://localhost:8420/', {
                email: this.formdata.log_email,
                password: this.formdata.log_pass
            })
            .then(function(loginRes) {
                if (loginRes.data) {
                    $state.go('tabsController.eVaca');
                } else {
										$scope.errorMessage = 'Wrong email or password';
                }
            });
    };
})

.controller('signUpCtrl', function($scope, $http, $state) {
    $scope.signup = function() {
        $http.post('http://localhost:8420/signup', {
                name: this.formdata.name,
                email: this.formdata.email,
                password: this.formdata.log_pass
            })
            .then(function(signupRes) {
                if (signupRes.data) {
                    $state.go('verifcationCode');
                } else {
                    $scope.errorMessage = 'A user with that email already exists';
                }
            });
    };
})

.controller('verifcationCodeCtrl', function($scope, $http, $state) {
    $scope.verifycode = function() {
        $http.post('http://localhost:8420/verificationcode', {
                verificationcode: this.formdata.code
            })
            .then(function(verifRes) {
                if (verifRes.data == "true") {
                    $state.go('tabsController.planner');
                } else {
										$scope.errorMessage = 'Wrong validation code';
                }
            });
    };
})

.controller('resetPasswordCtrl', function($scope, $http, $state) {
	$scope.getemail = function() {
		$http.post('http://localhost:8420/verify', {
				email: this.formdata.email
			})
			.then(function(resetRes) {
				if (resetRes.data) {
					$scope.confirmMessage = 'Email has been sent';
				} else {
					$scope.errorMessage = 'Email is not registered';
				}
			});
	};
})

.controller('eVacaCtrl', function($scope, $http, $ionicPopup, $state, planner) {
	$http.get('http://localhost:8420/main').then(function(response) {
		$scope.planners = response.data;
	});

	$scope.$watch(function() {
		return planner.getNewPlanner();
	}, function(planner) {
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
	itemRemoval($scope, $http, $ionicPopup, title, template);
})

.controller('newEmailCtrl', function($scope, $http) {
    $scope.changeEmail = function() {
        $http.post('http://localhost:8420/newEmail', {
                newEmail: this.formdata.email1
            })
            .then(function(changeRes) {
                //  console.log(changeRes);
            });
    };
})

.controller('newPasswordCtrl', function($scope, $http) {
    $scope.changePassword = function() {
        $http.post('http://localhost:8420/newPassword', {
                newPass: this.formdata.pass1
            })
            .then(function(changeRes) {
                //  console.log(changeRes);
            });
    };
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
	itemRemoval($scope, $http, $ionicPopup, title, template, $stateParams.plannerId);
})

.controller('recommendationsCtrl', function($scope, $http, $state, $ionicPopup) {

})

.controller('accountPreferencesCtrl', function($scope, $http, $state, $ionicPopup) {
    $scope.deleteAccount = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Delete account',
            template: 'Are you sure you want to delete your account?'
        });
        confirmPopup.then(function(res) {
            if (res) { // Deletion confirmed
                $http.post('http://localhost:8420/deleteAccount', {})
                    .then(function(delRes) {
                        //  console.log(delRes);
                    });
                $state.go('login');
            } else {
                console.log('Deletion canceled');
            }
        });
    };
})

function itemRemoval($scope, $http, $ionicPopup, title, template, plannerID) {
	$scope.remove = function(item) {
		var confirmPopup = $ionicPopup.confirm({
			title: title,
			template: template
		});
		confirmPopup.then(function(res) {
			if (res) { // Deletion confirmed
				if ('location' in item) {
						plannerRemoval($scope, $http, $ionicPopup, item);
				} else {
						eventRemoval($scope, $http, $ionicPopup, item,plannerID);
				}
			} else {
				console.log('Deletion canceled');
			}
		});
	};
}

function plannerRemoval($scope, $http, $ionicPopup, item) {
	console.log('removing planner');
	dbDeleteRequest($http, 'deletePlanner', item, function(delresponse) {
		if (delresponse.data) {
			var plannerIndex = $scope.planners.indexOf(item);
			$scope.planners.splice(plannerIndex, 1);
		} else {
			ionicAlert($scope, $ionicPopup);
			$scope.showAlert();
		}
	});
}

function eventRemoval($scope, $http, $ionicPopup, item, plannerID) {
	console.log('removing event');
	dbEventDeleteRequest($http, 'deleteEvent', item, plannerID, function(delresponse) {
			if (delresponse.data) {
				var eventIndex = $scope.events.indexOf(item);
				$scope.events.splice(eventIndex, 1);
			} else {
				ionicAlert($scope, $ionicPopup);
				$scope.showAlert();
			}
		});
}

function dbDeleteRequest($http, path, item, callback) {
	$http.post('http://localhost:8420/' + path, {
			itemId: item._id
		})
		.then(function(delresponse) {
				callback(delresponse);
		});
}

function dbEventDeleteRequest($http, path, item,plannerid, callback) {
	$http.post('http://localhost:8420/' + path, {
               plannerID: plannerid,
			itemId: item._id
		})
		.then(function(delresponse) {
				callback(delresponse);
		});
}

function ionicAlert($scope, $ionicPopup) {
	$scope.showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Cannot delete',
			template: 'Please, try again'
		});
		alertPopup.then(function(res) {
			console.log("Couldn't delete from the database");
		});
	};
}

function plannerController($scope,planner,$http,$state,$q){
     var pm = this;
     console.log("PLANNER CONTROLLER ACTIVE");
		 $scope.currentDate = new Date();
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
