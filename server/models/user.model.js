/************************************************************ @fileoverview<pre>
	Name:           Planner.js
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
//var Schema = mongoose.Schema;
//******************************************************************************

//******************************* Mongoose Object Creation *********************
// var user = new Schema({
//      email:String,
//      password:String,
//      Current:{type:[mongoose.model('Planner')]}
// })
"use strict"

class User{
     constructor(email,password,name,active_planner){
          this.email = email;
          this.password = password;
          this.name = name;
          this.Current = active_planner;
     }

     set login(){

     }

     set logout(){

     }

     set viewPlanner(){

     }

     set delete_planner(){

     }

     set add_planner(){

     }

     set viewPlanner(){

     }

     set del_Account(){

     }

     set change_password(){

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
