/************************************************************ @fileoverview<pre>
	Name:           Storage.js
	Author:         Leon Liang
	Created:        6/15/2016
	For Version:		1.0x
	Modifications:	Functions added and connection to database moved to server.js.
	Summary:
          Storage javascript.
          All database work should be here :: storing and retrieving of information

</pre>*************************************************************************/
//******************************* Configuration ********************************
//Define Modules Requirement Here
//Calls application level module
var application = require("./application.js");
var mongoose = require('mongoose');



//******************************* Global Variables *****************************
//Place you global variables here.
//******************************************************************************
var db_url = 'mongodb://localhost/evacadb'



/*********************************Export Modules******************************/

//Verify correct username and password
exports.login_verification = function login(usr, pass){

}

//Modify password
exports.modify_pass = function modPass(){

}

//Modify email
exports.modify_email = function modEmail(){

}

//Modify username
exports.modify_username = function modUsername(){

}

//Function to insert one user in the database
exports.insert_user = function insertUser(usr, pass, email, sec_q, sec_a){

}

//Function used to delete a user
exports.delete_user = function deleteUser(email){

}

//Function to add a planner to a given user with certain
exports.add_planner = function addPlanner(email_fk, city_fk, idPlanner, isActive){

}

//Function to add the preferences to a planner
exports.add_preference = function addPreference(city, occassion, age_appr, leave_date, return_date, ideal_opt, budget){

}

//Adds an event to a specific planner
exports.add_event = function addEvent(idPlanner_fk, name, date, time, cost){

}

//Function used to update the planner
exports.updatePlanner = function updatePlanner(email_fk, city_fk, idPlanner, isActive){

}

//Function to update the preferences of a user
exports.updatePreferences = function(city, occassion, age_appr, leave_date, return_date, ideal_opt, budget){

}

//Function to get all the events of a user
exports.get_allevents = function getAllEvents(email_fk){

}

//Function to get all the events of a user for a given plannerm
exports.get_events_planner = function getEventsByPlanner(email_fk, idPlanner_fk){

}

//Function to get all the planners of a user
exports.get_user_planners = function getUserPlanners(email_fk){

}
/*****************************************************************************/


//**************************** Function Definitions ****************************

/** ****************************************************************************
  *             returnSuccess()
  *             Return success upon successful DB operations
  * @param      {none} None
  * @returns    boolean true or false
  *****************************************************************************/

  function returnSuccess(){

      return true;
  }

/** ****************************************************************************
  *             getAccount()
  *             Return Account Params
  * @param
  * @returns
  *****************************************************************************/
  function getAccount(){

  }
