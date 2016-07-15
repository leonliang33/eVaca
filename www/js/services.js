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
                    data: 'username=' + username + '&password=' + password + '&RememberMe=false'
               }
               console.log('trigger post request');
               if($http.post("http://localhost:8420/",{username: username,password: password})){
                    return true;
               }else{
                    return false;
               }

     }

     return fac;

})

.service('BlankService', [function(){

}]);
