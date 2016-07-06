/************************************************************ @fileoverview<pre>
	Name:           Storage.js
	Author:         Leon Liang
	Created:        6/15/2016
	For Version:		1.0x
	Modifications:
	Summary:
          Storage javascript.
          All database work should be here :: storing and retrieving of information

</pre>*************************************************************************/
//******************************* Configuration ********************************
/*                       Define Modules Requirement Here                        */
var storage = require("./storage.js");

//******************************* Global Variables *****************************
//Place you global variables here.
//These variables can be called from any point in the iScript
var budget;
//******************************************************************************


//Send budget back to front end UI
exports.sendBudget = function sendBudget(){

     return budget;
}

//Retrieve information from DB
exports.getInfo = function getInfo(){

}

//Return weather status given location
exports.weather = function getWeather(location){
     var weather;

     return weather;
}

//Return uber availability given location
exports.uber = function uber_availability(location){
     var isAvailable;

     return isAvailable;
}

//**************************** Function Definitions ****************************
/** ****************************************************************************
  *             budgetCalculation()
  *             Main Algorithm For Calculating Event Budget
  * @param     <int> ::  user's stated budget
  * @returns    <int> :: Budget
  *****************************************************************************/
  function budgetCalculation(user_budget){
       var rem_budget;
       budget=user_budget - budget;
       return rem_budget;
  }

  //**************************** Function Definitions ****************************
  /** ****************************************************************************
    *             getExternInfo()
    *             API Calls to retrieve information not in our database
    * @param
    * @returns
    *****************************************************************************/
    function getExternInfo(){

    }

    //**************************** Function Definitions ****************************
    /** ****************************************************************************
      *             calcEvent(event)
      *             API Calls to retrieve information not in our database
      * @param      The event name or location
      * @returns    <int> :: Cost of the event 
      *****************************************************************************/
      //Caculate Cost of Event
      function calcEvent(event){
           var cost;

           return cost;
      }
