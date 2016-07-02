angular.module('app.services', [])

.factory('login', [function($http, $q){
     return (
          function note(username,password){
               console.log("SOMETHING");
               var request = {
                    method: 'POST',
                    url: 'localhost:8420',
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'UserName=' + username + '&Password=' + password + '&RememberMe=false'
               }
               console.log('trigger post request');
               return $http.post("localhost:8420/",request);

     }
     )
}])

.service('BlankService', [function(){

}]);
