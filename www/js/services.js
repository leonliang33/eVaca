angular.module('app.services', [])

.factory('planner',function($http,$q){
      var planner = null;

      function setNewPlanner(newPlanner) {
          planner = newPlanner;
      }

      function getNewPlanner() {
          return planner;
      }

     return{
          getPlanner: function(location, budget,Leaving,returningdate,idealvacation){
               console.log("get planner entered");
               var deferred = $q.defer();
               $http.post("http://localhost:8420/planner", {location:location, budget:budget,Leaving:Leaving,returningdate:returningdate,idealvacation:idealvacation}).then(successcall,errorcall);
                    function successcall(results){
                        //  console.log(results.data);
                        //  if(results.data.toString().replace(/'/g,"") == "0")
                        //  {
                        //       console.log(results.data.toString().replace(/'/g,""));
                        //       console.log("true");
                        //       deferred.resolve(results.data.toString().replace(/'/g,""));
                        //       console.log("resolved");
                        //  } else {
                        //       console.log(results.data.toString().replace(/'/g,""));
                        //       console.log("false");
                        //       deferred.resolve('false');
                        //  }
                        // console.log(results.data);
                        if(results.data){
                             setNewPlanner(results.data);
                             deferred.resolve(results.data);

                        }else{
                             deferred.resolve(false);
                        }
                    }
               function errorcall(){
                    deferred.reject(false);
               }
               return deferred.promise;
          },
          setNewPlanner: setNewPlanner,
          getNewPlanner: getNewPlanner,
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
