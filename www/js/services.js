angular.module('app.services', [])

.factory('login', function($http,$q){
     // var fac ={};
     //
     // fac.note = function(username,password){
     //           console.log("SOMETHING");
     //           var request = {
     //                method: 'POST',
     //                url: 'http://localhost:8420/',
     //                headers: {
     //                     'Content-Type': 'application/x-www-form-urlencoded'
     //                },
     //                data: 'username=' + username + '&password=' + password + '&RememberMe=false'
     //           }
     //           console.log('trigger post request');
     //           $http.post("http://localhost:8420/",{username: username,password: password}).then(successcall,errorcall);
     //           function successcall(){
     //                console.log('success');
     //                return true;
     //           }
     //           function errorcall(){
     //                console.log('not success');
     //                return false;
     //           }
     //
     // }
     //
     // return fac;
     return{
          note: function(username,password){
               var deferred = $q.defer();
               $http.post("http://localhost:8420/",{username: username,password: password}).then(successcall,errorcall);
               function successcall(results){
                    // console.log('success');
                    // return true;
                    console.log(results.data);
                    if(results.data == "true"){
                         deferred.resolve(results.data);
                    }else{
                         deferred.resolve(results.data);
                    }

               }
               function errorcall(){
                    deferred.reject(false);
               }
               return deferred.promise;
          }
     }
})

.service('BlankService', [function(){

}]);
