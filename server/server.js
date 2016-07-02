//Contains server side main
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//Calls on storage and applicatioon level modules
var storage = require("./storage.js");
var application = require("./application.js");

app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

//Receive post requests from client
app.post("/", function (req, res) {
    console.log("Post received");
    console.log(req.body.UserName);
    console.log(req.body.Password);
    storage.login_verification(req.body.UserName,req.body.Password);
});

app.listen(8420);
console.log("Listening on :: " + 8420);
