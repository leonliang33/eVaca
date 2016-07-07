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
var storage = require("./storage.js");
var application = require("./application.js");

//******************************* Global Variables *****************************
//Place you global variables here.
//******************************************************************************

/*********************************Websockets and Middleware Routing******************************/

app.use(bodyParser.urlencoded({
    extended: true
}));

// /**bodyParser.json(options)
//  * Parses the text as JSON and exposes the resulting object on req.body.
//  */
app.use(bodyParser.json());

//This no work and IDK WHY :(

app.use(function(req, res,next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
	 
});


//Receive post requests from client
app.post("/", function (req, res) {
    console.log("Post received from post");
    console.log(req.body.UserName);
    console.log(req.body.Password);
    res.send("Login Info Received");
    storage.login_verification(req.body.UserName,req.body.Password);
});

//Receive post requests from client
app.get("/", function (req, res) {
     res.send("Hello World");
    console.log("Post received from get");
     console.log(req.body.username);
     console.log(req.body.password);
     res.send("Hello World");
    storage.login_verification(req.body.username,req.body.username);
});

app.listen(8420,function(){
     console.log("Listening on :: " + 8420);
});
