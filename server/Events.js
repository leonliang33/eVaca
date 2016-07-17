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
     constructor(time, cost, dest, theme) {
          this.time = time;
          this.cost = cost;
          this.dest = dest;
          this.theme = theme;
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
var API_KEY = 'AIzaSyCQkZamcWwjJ9UPNqFvtAklm5UH_3Dfo6c';

Event.prototype.getApiEvents = function(callback) {
    yelp.search({
            location: this.dest,
            sort: 2, // Highest rated
            category_filter: this.theme
        })
        .then(function(data) {
            callback(data);
        })
        .catch(function(err) {
            console.error(err);
        });
}

Event.prototype.getEventName = function(data) {
    return data.businesses[0].name;
}

Event.prototype.getEventImageUrl = function(data) {
    return data.businesses[0].image_url;
}

Event.prototype.getCost = function(name_of_place){
     // return new Promise( function(resolve,reject){
     //      var placeID;
     //      var GooglePlaces = require("node-googleplaces");
     //      const places = new GooglePlaces(API_KEY);
     //      const params = {
     //           location: '40.689247,-123.102192',
     //           radius: 1000
     //      };
     //      var query =
     //      {
     //            query: name_of_place
     //       };
     //       // ASYNC call
     //       places.textSearch(query).then((res) => {
     //            console.log("FIRST ASYNC CALL");
     //            console.log(res.body.results[0].place_id);
     //            placeID = res.body.results[0].place_id;
     //            var request_place_details={
     //                 placeid : placeID
     //            };
     //            console.log(request_place_details);
     //            //Another ASYNC CALL
     //            return request_place_details;
     //
     //       }).then((request_place_details) => {
     //            console.log("SECOND ASYNC CALL");
     //            var plc_detail = places.details(request_place_details).then((res) => {
     //                 console.log(res.body.result.price_level + "   S");
     //                 var cost = res.body.result.price_level;
     //                 //trying to resolve getCost promise
     //                 //resolve(this.cost);
     //                 return cost;
     //            });
     //            return plc_detail;
     //       }).then((ret) => {
     //            resolve(ret);
     //       });
     //  })
     var GooglePlaces = require("node-googleplaces");
     const places = new GooglePlaces(API_KEY);

     return places.textSearch({ query: name_of_place })
        .then(res => res.body.results[0].place_id)
        .then(placeID => places.details({ placeid : placeID }))
        .then(res => res.body.result.price_level);
};

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
