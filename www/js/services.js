angular.module('app.services', [])

.factory('login', function($http){
     var fac ={};

     fac.note = function(username,password){
               console.log("SOMETHING");
               var request = {
                    method: 'POST',
                    url: 'http://localhost:8420/',
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'UserName=' + username + '&Password=' + password + '&RememberMe=false'
               }
               console.log('trigger post request');
               return $http.post("http://localhost:8420/",{user: username,password: password});


     }

     return fac;

})

.service('BlankService', [function(){

}]);
