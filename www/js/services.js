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
                         deferred.reject(results.data);
                    }

               }
               function errorcall(){
                    deferred.reject(false);
               }
               return deferred.promise;
          }
     }
})


.factory('newPassword', function($http,$q){
     return{
          getnewPass: function(code,pass1,pass2){
               var deferred = $q.defer();
               $http.post("http://localhost:8420/newpassword",{code:code,pass1:pass1,pass2:pass2}).then(successcall,errorcall);
               function successcall(results){
                    console.log(results.data);
                    if(results.data == "true"){
                         deferred.resolve(results.data);
                    }else{
                         deferred.reject(results.data);
                    }
               }
               function errorcall(){
                    deferred.reject(false);
               }
               return deferred.promise;
          }
     }
})


.factory('signUp', function($http,$q){
     return{
          note: function(name,email,password){
               var deferred = $q.defer();
               $http.post("http://localhost:8420/signup",{name: name, email: email,password: password}).then(successcall,errorcall);
               function successcall(results){
                    // console.log('success');
                    // return true;
                    console.log(results.data);
                    if(results.data){
                         deferred.resolve(results.data);
                    }else{
                         deferred.resolve(false);
                    }

               }
               function errorcall(){
                    deferred.reject(false);
               }
               return deferred.promise;
          }
     }
})

.factory('planner',function($http,$q){
     return{
          getPlanner: function(location, budget,Leaving,returningdate,idealvacation){
               console.log("get planner entered");
               var deferred = $q.defer();
               $http.post("http://localhost:8420/planner", {location:location, budget:budget,Leaving:Leaving,returningdate:returningdate,idealvacation:idealvacation}).then(successcall,errorcall);
                    function successcall(results){
                         console.log(results.data);
                         if(results.data.toString().replace(/'/g,"") == "0")
                         {
                              console.log(results.data.toString().replace(/'/g,""));
                              console.log("true");
                              deferred.resolve(results.data.toString().replace(/'/g,""));
                              console.log("resolved");
                         } else {
                              console.log(results.data.toString().replace(/'/g,""));
                              console.log("false");
                              deferred.resolve('false');
                         }
                    }
               function errorcall(){
                    deferred.reject(false);
               }
               return deferred.promise;
          }
     }
})

.factory('resetpassword',function($http, $q){
     return{
          getEmail: function(email){
          var deferred = $q.defer();
          $http.get("http://localhost:8420/verify",{email:email}).then(successcall,errorcall);
               function successcall(results){
               console.log(results.data);

               if(results.data == "true")
               {
                    deferred.resolve(results.data);
               }else{
                    deferred.reject(results.data);
               }

          }
     function errorcall(){
          deferred.reject(false);
     }
     return deferred.promise;
     }
}
})

.factory('verificationcode',function($http, $q){
     return{
          getCode: function(verificationcode){
          var deferred = $q.defer();
          $http.post("http://localhost:8420/verificationcode",{verificationcode:verificationcode}).then(successcall,errorcall);
               function successcall(results){
               console.log(results.data);

               if(results.data == "true")
               {
                    deferred.resolve(results.data);
               }else{
                    deferred.reject(results.data);
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
