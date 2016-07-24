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

.service('BlankService', [function(){

}]);
