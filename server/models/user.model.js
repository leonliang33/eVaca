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
     constructor(email,password,name,active_planner){
          this.email = email;
          this.password = password;
          this.name = name;
          this.Current = active_planner;
     }

     get login(){

     }

     get logout(){

     }

     get viewPlanner(){

     }

     get delete_planner(){

     }

     get add_planner(){

     }

     get view_Planner(){

     }

     get del_Account(){

     }

     get change_password(){

     }

     get getPlanner(){
          return this.Current;
     }

     get getEmail(){
          return this.email;
     }

}

module.exports.User;



//******************************************************************************
