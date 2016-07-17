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

var Yelp = require('yelp');

//******************************* Global Variables *****************************
//******************************************************************************

var yelp = new Yelp({
    consumer_key: 'nLM2vzedMhy4fpbcndEivA',
    consumer_secret: 'S5p83wbhckJXEbdPhWG9b4gIc7w',
    token: '7P_xpPKZLm395vYkrRU2ZA77oZSLiAfj',
    token_secret: 'WQYwCZ5ktQFSmbB-qE7CLX5m0MI'
});

//******************************* Mongoose Object Creation *****************************
"use strict";
class Event{
     constructor(time,cost,dest){
          this.time = time;
          this.cost = cost;
          this.dest = dest;
          // this.name = Event.get_api(this.dest,this.cost,this.time);
     }

    //  //gets event information from external source
    //  static get_api(dest, cost, time) {
    //       return "statue of liberty";
    //  }

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

Event.prototype.name = function() {
  yelp.search({
			location: this.dest,
			sort: 2, // Highest rated
			category_filter: 'arts'
		})
		.then(function(data) {
      return data.businesses[0].name;
		})
		.catch(function(err) {
			console.error(err);
		});
}

Event.prototype.getCost = function(longLat){
     //getCost(){
          var GooglePlaces = require("node-googleplaces");
          const places = new GooglePlaces('AIzaSyBudcI5Vkbr-gWSN7OlW0wbCIREQi8jtiU');
          const params = {
            location: '49.250964,-123.102192',
            radius: 1000
          };
           var query =
           {
                location : '-33.8670522,151.1957362',
                radius : 500
           };
          // Callback
          places.nearbySearch(query, (err, res) => {
               //console.log(res.body);
               //console.log(res.body.results.place_id);

          });

          // Promise
          places.nearbySearch(query).then((res) => {
            //console.log(res.body);
            console.log(res.body.results[0].place_id);
          });
          return this.cost;
     //}
}

module.exports = Event;

//******************************************************************************
