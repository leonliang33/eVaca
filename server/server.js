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
var email;

var planners2 =
   {location:String, events:[null]};
var newUser = new storage.User({
     name: String,
     email: String,
     password: String,
     planner: planners
});
var ares = new storage.User({
     name: 'Kratos',
     email: 'kratos@war.com',
     password: 'ADS343!QEF#0',
     planner: [{
          _id: 132,
          isCurrent: true,
          prefereces:{
               city: 'Olympus',
               occassion: 'Fun',
               age_appr: 30,
               leaving: "2016-10-20T20:00:00.000Z",
               returning: "2016-10-30T10:00:00.000Z",
               ideal_opt: 'killing',
               budget: 0
          },
          events: [{
               name: 'Kill gods at beach bay'
          },{
               name: 'Get orbs in the cave'
          }]
     }]
});
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
    {_id: 0, location: 'New York City', events: eventsOne},
    {_id: 1, location: 'Miami', events: eventsTwo}
];

app.get('/main', function(req, res) {
    sess = req.session;
    console.log('-------');
    console.log(email);
    console.log('---------');
    storage.find_by_email(email).then(dbres => {
         console.log(dbres);
     res.send(dbres.planner);
    });
    //res.send(planners2);
});

app.get('/events', function(req, res) {
    // console.log(req.query.plannerId);
    sess=req.session;
    console.log(email);
    storage.find_by_email(email).then(user => {
         console.log("FROM FIND BY EMAIL :: "+ user);
         res.send(JSON.stringify(user.planner[0].events));
    })
    //res.send(planners2[0].events);
});

app.post('/planner', function(req,res){
     sess=req.session;
     sess.location = req.body.location;
     sess.budget=req.body.budget;
     sess.Leaving=req.body.Leaving;
     sess.returningdate=req.body.returningdate;
     sess.idealvacation=req.body.idealvacation;
     planners.location = sess.location;

     var Event1 = new events(7,10,req.body.location, 'food');

     console.log("About to call events get api");
     Event1.getApiEvents(function(response) {
        console.log(Event1.getEventName(response));
        console.log(Event1.getEventImageUrl(response));

        planners2.location = req.body.location;
        planners2.events = [{name: Event1.getEventName(response), image_url: Event1.getEventImageUrl(response)} ];

        console.log(planners2);
        console.log('-----------------------------------');
        console.log(planners2.events);

        //res.send("0");

        // ------- Old with the bug
        // events3.name = Event1.getEventName(response);
        // events3.image_url = Event1.getEventImageUrl(response);
        // console.log("sess email :: "+email);
        //
        // planners2[0].location = sess.location;
        // planners2[0].events = events3.image_url;
        //
        // console.log(planners2);
        storage.addPlannerToUser(email,planners2).then(result => res.send('0'));
   })
});

//Receive post requests from client
app.post("/", function (req, res) {
     sess=req.session;
    console.log("Post received from post");
    console.log(req.body.username);
    console.log(req.body.password);
    sess.email = req.body.username;
    sess.password = req.body.password;
    //console.log(req);
    // res.send("true");
    email = req.body.username;
    storage.login_verification(req.body.username,req.body.password).then(result => res.send(result));
});


app.post('/signup', function(req,res){
     sess=req.session;
    console.log("Post received from post");
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);

    sess.name=req.body.name;
    sess.email=req.body.email;
    sess.password=req.body.password;
    console.log(sess.name);
    console.log(sess.email);
    console.log(req.body.password);
    newUser.name = req.body.name;
    newUser.email=req.body.email;
    newUser.password=req.body.password;
    // res.send("true");
    email = sess.email;
    storage.insert_user(newUser).then(results=>res.send(results));

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
     storage.connect();
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
