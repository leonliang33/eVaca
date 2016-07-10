/************************************************************ @fileoverview<pre>
	Name:           Storage.js
	Author:         Leon Liang
	Created:        6/15/2016
	For Version:		1.0x
	Modifications:	Functions added. Connection to database implemented.
	Summary:
          Storage javascript.
          All database work should be here :: storing and retrieving of information

</pre>*************************************************************************/
//******************************* Configuration ********************************
//Define Modules Requirement Here
//Calls application level module
var application = require("./application.js");
var mongoose = require('mongoose');
var user_model = require('./models/user.model.js');


//******************************* Global Variables *****************************
//Place you global variables here.
//******************************************************************************
var db_url = 'mongodb://localhost/evacadb'



/*********************************Export Modules******************************/
/*These are functions that can be called outside the class*/

//Authentication
exports.auth = function auth(){

}

//Update User
exports.updateUser = function updateUser(email){

}

exports.store = function store(User){

}

exports.retrieve = function retrieve(email){

}
/*****************************************************************************/




//**************************** Function Definitions ****************************


/** ****************************************************************************
  *             connectToDatabase()
  *             Function to establish the connection to the dababase. It returns
  *				true if the connection was successful, or false if unsuccessful.
  *
  * @param      {none} None
  * @returns    boolean true or false
  *****************************************************************************/
  function connectToDatabase(){

	  mongoose.connect(db_url);
	  var db = mongoose.connection;

	  db.on('error', function(err){
		  console.log("Connection to database unsuccessful.\n" + err);
		  return false;
	  });

	  db.on('connected', function() {
		  console.log("Connection to database successful.");
		  return true;
	  });

	  db.on('disconnected', function () {
		  console.log('Disconected from the database.');
		  return false;
	  });

	  console.log("Connection to database unsuccessful.");
	  return false;
  }



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
  * @returns    JSON file with account details
  *****************************************************************************/
  function getAccount(){

  }
