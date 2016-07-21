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

//var firebase = require("firebase");

//******************************* Global Variables *****************************
var db_url = 'mongodb://localhost/evacadb';
var sess;
//******************************************************************************
//
// var config = {
//   apiKey: "AIzaSyDUUUo_Nf1Z6sWOdKsDKWAN28rPPXCRG00",
//   authDomain: "evaca-277d9.firebaseapp.com",
//   databaseURL: "https://evaca-277d9.firebaseio.com",
//   storageBucket: "evaca-277d9.appspot.com",
// };
// firebase.initializeApp(config);
//
// var firebase = require("firebase");

// Initialize the app with a service account, granting admin privileges
// firebase.initializeApp({
//   databaseURL: "https://evaca-277d9.firebaseio.com",
//   serviceAccount: './eVaca-e291cd5173a6.json'
// });
