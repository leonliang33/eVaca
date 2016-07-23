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
var Events = require('../Events.js');
var storage = require('../storage.js');
//******************************* Global Variables *****************************
//******************************************************************************

//******************************* Mongoose Object Creation *********************
"use strict";

class User{
     constructor(email){
          this.planners = new Array();
          this.email = email;
          this.password;
          this.name;
          this.Current;
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
User.prototype.add_planner = function(days,budget,location,type,email){
     return new Promise(function(resolve,reject){
          var Event1 = new Events(days,budget,location,type);
          var planners2 =
             {location:String, events:[null]};
          Event1.getApiEvents(function(response) {

             planners2.location = location;
             planners2.events = response.businesses;
             while(days>=0){

                  if(budget == Event1.getCost(response.businesses[days])){
                       planners2.events = [{name: response.businesses[days].name, image_url: response.businesses[days].image_url} ];
                  }
                  days--;
             }

             setTimeout(function(){
                  resolve(storage.addPlannerToUser(email,planners2));
             },3000)



           });
     })
}


module.exports = User;



//******************************************************************************
