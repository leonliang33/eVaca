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
var session = require('express-session');
var app = express();
var bodyParser = require("body-parser");
//var firebase = require("firebase");
//Calls on storage and applicatioon level modules
var events = require("./Events.js");
var storage = require("./storage.js");
var application = require("./controllers/users.controller.js");
var mongoose = require('mongoose');
var User = require('./models/user.model.js');
var nodemailer = require('nodemailer');
//var firebase_db = require('./firebase_db.js');

//******************************* Global Variables *****************************
var db_url = 'mongodb://localhost/evacadb';
var sess;
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

app.use(session({secret : 'secret'}));

var eventsOne = [
    {name: 'Statue of Liberty', image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/zFViHlJJeJ4RhRWFYdXDQQ/ls.jpg'},
    {name: 'Zen Bikes', image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/nd3h0tvmF7AW8jejOgneWQ/ls.jpg'}
];
var eventsTwo = [
    {name: 'Kush', image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/Ws9T2waA0I-kPNscx0mXqA/ls.jpg'},
    {name: 'Diced', image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/y1PsCe_i-Kb-lql2qAnFcg/ls.jpg'}
];
var planners = [
    {_id: 0, location: 'New York City', eventss: eventsOne},
    {_id: 1, location: 'Miami', eventss: eventsTwo}
];

app.get('/main', function(req, res) {
    res.send(planners);
});

app.get('/events', function(req, res) {
    // console.log(req.query.plannerId);
    res.send(planners[req.query.plannerId].eventss);
});

//Receive post requests from client
app.post("/", function (req, res) {
     sess=req.session;
    console.log("Post received from post");
    console.log(req.body.username);
    console.log(req.body.password);
    sess.username = req.body.username;
    sess.password = req.body.password;
    //console.log(req);
    // res.send("true");
    storage.login_verification(req.body.username,req.body.password);
});

app.post('/signup', function(req,res){
     sess=req.session;
    console.log("Post received from post");
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);


    // res.send("true");
    // storage.insert_user(req.body.name,req.body.email,req.body.password);

  //user.save(function(err){
    //req.login(user,function(err){
     // res.redirect('/')
   // });
 // });
});

app.post('/verify', function (req, res) {
     sess=req.session;
    console.log("Post received from post");
    console.log(req.body.email);
    res.send("true");
    //storage.verify_email(req.body.email);
});

app.post('/sendEmailVerification',function(req,res){
     sess=req.session;
     var rec_email = "evaca8420@gmail.com";
     var code = "ABC";
     var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'evaca8420@gmail.com', // Your email id
            pass: 'evacaproject' // Your password
       }});
     var mailOptions = {
           from: 'evaca8420@gmail.com>', // sender address
           to: rec_email, // list of receivers
           subject: 'Email Example', // Subject line
           text: "Welcome to eVaca, here's your verification code:" + code //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
     };
     transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
     });
});

app.get('/logout',function(req,res){
     req.session.destroy(function(err) {
       if(err) {
         console.log(err);
       } else {
         res.send('true');
       }
     })
});


//Server is currently serving on port 8420
app.listen(8420, function startServer() {
     //storage.connect();
     // firebase.initializeApp({
     //   databaseURL: "https://evaca-277d9.firebaseio.com",
     //   serviceAccount: './eVaca-e291cd5173a6.json'
     // });
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
