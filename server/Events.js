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
"use strict";
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
     var days_lim=this.time*3;
     if(days_lim > 20){
          days_lim = 20;
     }
    //  console.log("this theme " +this.theme);
    yelp.search({
            location: this.dest,
            sort: 2, // Highest rated
            category_filter: this.theme,
            limit: days_lim
        })
        .then(function(data) {
             //console.log(data);
            callback(data);
        })
        .catch(function(err) {
            console.error(err);
            callback("Location Not Found");
        });
}

Event.prototype.getEventName = function(data) {
    return data.businesses[0].name;
}

Event.prototype.getEventImageUrl = function(data) {
    return data.businesses[0].image_url;
}

Event.prototype.getEventNameAt = function(data, index) {
    return data.businesses[index].name;
}

Event.prototype.getEventImageUrlAt = function(data, index) {
    return data.businesses[index].image_url;
}

Event.prototype.getCost = function(name_of_place){

     var GooglePlaces = require("node-googleplaces");
     const places = new GooglePlaces(API_KEY);

     return places.textSearch({ query: name_of_place })
        .then(res => res.body.results[0].place_id)
        .then(placeID => places.details({ placeid : placeID }))
        .then(res => res.body.result.price_level).then(price => price*100);
};

module.exports = Event;

//******************************************************************************
