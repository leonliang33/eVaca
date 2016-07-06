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
//Define Modules Requirement Here
//Calls application level module
var application = require("./application.js")
var mongodb = require("mongodb").MongoClient;



//******************************* Global Variables *****************************
//Place you global variables here.
//******************************************************************************




/*********************************Export Modules******************************/

//Login export :: Verify correct username and password
exports.login_verification = function login(usr,pass){

}

//Modify Password
exports.modify_pass = function modPass(){

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
    *             returnSuccess()
    *             //Return Account Params
    * @param      None
    * @returns    None
    *****************************************************************************/
    function getAccount(){

    }
