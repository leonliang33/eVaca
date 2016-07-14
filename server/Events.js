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

     //gets event information from external source
     static get_api(dest,cost,time){
          return name;
     }

     //set time in which this event is available
     set set_time(time){
          this.time=time;
     }

     //gets the cost of this event
     get getCost(){
          var map,service,infoWindow;
          //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
          var location = new google.maps.LatLng(-33.8665433,151.1956316);
          var google_places_api_key = 'AIzaSyBudcI5Vkbr-gWSN7OlW0wbCIREQi8jtiU';
          var eventParams = {
               ""
          };
          return this.cost;
     }

}

/** ****************************************************************************
  * Name:       recommend()
  *             Returns other events of similar to this events
  *
  * @param
  * @returns    Events
  *****************************************************************************/
Event.prototype.recommend = function(){

}

module.exports = Event;

//******************************************************************************
