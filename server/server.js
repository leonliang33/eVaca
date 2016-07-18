/************************************************************ @fileoverview<pre>
	Name:           server.js
	Author:         Leon Liang
	Created:        6/15/2016
	For Version:		1.0x
	Modifications:
	Summary:
          Server side main javascript. Contains all get and post

</pre>*************************************************************************/
//******************************* Configuration ********************************
//Define Modules Requirement Here

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//Calls on storage and applicatioon level modules
var events = require("./Events.js");
var storage = require("./storage.js");
var application = require("./controllers/users.controller.js");
var mongoose = require('mongoose');

//******************************* Global Variables *****************************
var db_url = 'mongodb://localhost/evacadb';
//******************************************************************************

/*********************************Websockets and Middleware Routing******************************/

app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());

app.use(express.static('www'));

app.use(function(req, res,next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
});

//Receive post requests from client
app.post("/", function (req, res) {
    console.log("Post received from post");
    console.log(req.body.username);
    console.log(req.body.password);
    //console.log(req);
    res.send("true");
    storage.login_verification(req.body.username,req.body.password);
});

app.listen(8420, function startServer() {
     console.log("Listening on :: " + 8420);
     var Event1 = new events(7,10,'Miami', 'arts');
    //  Event1.getApiEvents(function(response) {
        // console.log(Event1.getEventName(response));
        // console.log(Event1.getEventImageUrl(response));
    //  });
     // console.log(Event1.getCost('Thai Moon'));
    //  Event1.getCost('Thai Moon').then(res => {
    //       console.log("RETURNED VALUE:: " + res );
    //  })
});


/** ****************************************************************************
  *             connectToDatabase()
  *             Function to establish the connection to the dababase. It returns
  *				true if the connection was successful, or false if unsuccessful.
  *
  * @param      {none} None
  * @returns    boolean true or false
  *****************************************************************************/
  function connectToDatabase(){
	mongoose.connect(db_url);
	var db = mongoose.connection;

	db.on('error', function(err){
		console.log("Connection to database unsuccessful.\n" + err);
		return false;
	});


	db.on('connected', function() {
		console.log("Connection to database successful.");
		return true;
	});

	db.on('disconnected', function () {
		console.log('Disconected from the database.');
		return false;
	});

	console.log("Connection to database unsuccessful.");
	return false;

  }
