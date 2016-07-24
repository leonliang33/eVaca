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
"use strict";
var mongoose = require("mongoose");
var current_planners = require('../CurrentPlanner.js');
var Events = require('../Events.js');
var storage = require('../storage.js');
//******************************* Global Variables *****************************
//******************************************************************************

//******************************* Mongoose Object Creation *********************
//"use strict";

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

     // set setPassword(pass){
     //      this.password = pass;
     // }
     //
     // set setName(name){
     //      this.name=name;
     // }

}

User.prototype.updateUserEmail = function(newEmail) {
    storage.updateUserEmail(this.email, newEmail);
}

User.prototype.updateUserPass = function(newPass) {
    storage.updateUserPassword(this.email, newPass);
}

//Delete command to delete account from the database
User.prototype.del_Account = function() {
    storage.removeUser(this.email);
}

User.prototype.setName = function(name){
     this.name = name;
}

User.prototype.setPassword = function(pass){
     this.password = pass;
}

User.prototype.setEmail = function(email){
     this.email=email;
}

//Return list of planners
User.prototype.view_planner = function(itemID){

}

//Delete planner from list of planners
User.prototype.delete_planner = function(itemID){
     return storage.removePlanner(this.email, itemID);
}

User.prototype.delete_event = function(plannerID,itemID){
     return storage.removeEvent(this.email,plannerID, itemID);
}

//Add a planner to the list of planners
User.prototype.add_planner = function(days,budget,location,type,email){
     return new Promise(function(resolve,reject){
          var Event1 = new Events(days,budget,location,type);
          var planners2 =
             {location:String, events:[null]};
          Event1.getApiEvents(function(response) {
             // Quick hack to add to fix user's bad location inputs
             planners2.location = response.businesses[0].location.city;
             planners2.events = response.businesses;
             while(days>=0){

                  if(budget == Event1.getCost(response.businesses[days])){
                       planners2.events = [{name: response.businesses[days].name, image_url: response.businesses[days].image_url} ];
                  }
                  days--;
             }

             setTimeout(function(){
                  console.log(planners2);
                  resolve(storage.addPlannerToUser(email,planners2));
             },3000)



           });
     })
}

User.prototype.save = function(){

     console.log('save activated');
     console.log(this.name + " " + this.email + " " + this.password);
     var newUser = new storage.User({
          name: String,
          email: String,
          password: String,
          planner: [{}]
     });
     console.log(this.name + " " + this.email + " " + this.password);
     newUser.name = this.name;
     newUser.email = this.email;
     newUser.password = this.password;
     console.log(newUser);
     return new Promise(function(resolve,reject){
          resolve(storage.insert_user(newUser));
     })


}

User.prototype.load = function(email){
     console.log("load being called");
     return new Promise(function(resolve,reject){
          console.log("load being called2");
          console.log(email);
          resolve(storage.find_by_email(email));
     })
}



module.exports = User;



//******************************************************************************
