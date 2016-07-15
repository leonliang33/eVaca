angular.module('app.services', [])

.factory('login', function($http,$q){
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
