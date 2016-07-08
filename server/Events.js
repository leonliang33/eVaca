/************************************************************ @fileoverview<pre>
	Name:           Events.js
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

//******************************* Global Variables *****************************
//******************************************************************************

//******************************* Mongoose Object Creation *****************************
"use strict";
class Event{
     constructor(time,cost,dest){
          this.time = time;
          this.cost = cost;
          this.dest = dest;
          this.name = Event.get_api(this.dest,this.cost,this.time);
     }

     static get_api(dest,cost,time){
          return name;
     }

     set set_time(time){
          this.time=time;
     }

     get getCost(){
          return this.cost;
     }

}

Event.prototype.recommend = function(){
     //Return similar events
}

module.exports.Event;

//******************************************************************************
