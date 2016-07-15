/************************************************************ @fileoverview<pre>
	Name:           user.model.js
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
var mongoose = require("mongoose");
var current_planners = require('../CurrentPlanner.js');
//******************************* Global Variables *****************************
//******************************************************************************

//******************************* Mongoose Object Creation *********************
"use strict";

class User{
     constructor(email,password,name,active_planners){
          this.planners = new Array();
          this.email = email;
          this.password = password;
          this.name = name;
          this.Current = active_planners;
     }

     get login(){

     }

     get logout(){

     }

     set change_password(new_pass){
          this.password = new_pass;
     }

     get getPlanner(){
          return this.Current;
     }

     get getEmail(){
          return this.email;
     }

     set changeEmail(new_email){
          this.email = new_email;
     }

}

//Delete command to delete account from the database
User.prototype.del_Account = function(){

}

//Return list of planners
User.prototype.view_planner = function(){

}

//Delete planner from list of planners
User.prototype.delete_planner = function(){

}

//Add a planner to the list of planners
User.prototype.add_planner = function(){

}


module.exports = User;



//******************************************************************************
