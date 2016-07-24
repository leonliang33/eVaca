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
          setNewPlanner: setNewPlanner,
          getNewPlanner: getNewPlanner,
     }
})

.service('BlankService', [function(){

}]);
