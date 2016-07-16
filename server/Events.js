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
          return true;
     }

     //set time in which this event is available
     set set_time(time){
          this.time=time;
     }

     //gets the cost of this event
     // get getCost(){
     //      var GooglePlaces = require("node-googleplaces");
     //      const places = new GooglePlaces('AIzaSyBudcI5Vkbr-gWSN7OlW0wbCIREQi8jtiU');
     //      const params = {
     //        location: '49.250964,-123.102192',
     //        radius: 1000
     //      };
     //       var query =
     //       {
     //            location : '-33.8670522,151.1957362',
     //            radius : 500
     //       };
     //      // Callback
     //      places.nearbySearch(query, (err, res) => {
     //           console.log(res.body);
     //           console.log(res.body.results.place_id);
     //
     //      });
     //
     //      // Promise
     //      places.nearbySearch(query).then((res) => {
     //        //console.log(res.body);
     //        console.log(res.body.results[0].place_id);
     //      });
     //      return this.cost;
     // }

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

Event.prototype.getCost = function(longLat){
     //getCost(){
          var placeID;
          var GooglePlaces = require("node-googleplaces");
          const places = new GooglePlaces('AIzaSyBudcI5Vkbr-gWSN7OlW0wbCIREQi8jtiU');
          const params = {
            location: '40.689247,-123.102192',
            radius: 1000
          };
          //  var query =
          //  {
          //       location : '40.689247, ‎-74.044502',
          //       radius : 5
          //  };
           var query =
           {
                query: 'Restaurants near miami'
           };
          // Callback
          places.textSearch(query, (err, res) => {
               //console.log(res.body);
               //console.log(res.body.results.place_id);

          });

          // Promise
          places.textSearch(query).then((res) => {
            //console.log(res.body);
            console.log(res.body.results[0].place_id);
            placeID = res.body.results[0].place_id;


            var request_place_details={
                 placeid : placeID
            };

            console.log(request_place_details);

            places.details(request_place_details).then((res) => {
                 console.log(res.body.result.price_level);
                 //console.log(res.body.html_attributions.results.price_level);
                 this.cost = res.body.result.price_level;
                 return this.cost;
            });

          });

          //return this.cost;
     //}
}

module.exports = Event;

//******************************************************************************
