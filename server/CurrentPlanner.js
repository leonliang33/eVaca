/************************************************************ @fileoverview<pre>
	Name:           CurrentPlanner.js
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
var Preference = require('./Preferences.js');
var Events = require('./Events.js');
var users = require('./models/user.model.js');
var Planner = require('./Planner.js')
//******************************* Global Variables *****************************

//******************************************************************************

//******************************* Object Creation *****************************
"use strict";
class CurrentPlanner extends Planner{

     constructor(dest, budget, r_date, b_date){

          super(dest, budget, r_date, b_date);

     }

     set removeEvents(event){
          if(NumOfEvents() <= 0){
               //Return NULL :: Invalid operation

          }else{
               //Valid Operation

          }
     }

     get shuffleEvents(){

     }


     get NumOfEvents(){
          return this.Events.size();
     }

}

CurrentPlanner.prototype.calcBudget = function(){

}

CurrentPlanner.prototype.addEvents = function(time,cost,dest){

          var new_event = new Event(time,cost,dest);

          if(calcBudget(this.Preferences , new_event.cost)){
               this.Events.push(new_event);
          }

}


module.exports.CurrentPlanner;

//******************************************************************************
