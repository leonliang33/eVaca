/************************************************************ @fileoverview<pre>
	Name:           Storage.js
	Author:         Leon Liang
	Created:        6/15/2016
	For Version:		1.0x
	Modifications:	Functions added and connection to database moved to server.js.
	Summary:
          Storage javascript.
          All database work should be here :: storing and retrieving of information

</pre>*************************************************************************/
//******************************* Configuration ********************************
//Define Modules Requirement Here
//Calls application level module

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var url = "mongodb://localhost:27017/test";
var db = mongoose.connection;
var User = loadSchemas();
exports.User = User;

//*********** Exported Functions ***************

exports.updateUserEmail = function(email, newEmail){
	return new Promise(function(resolve, reject){
		var promise = User.findOne({email: email}).exec();

		promise.then(function(user) {
  			user.email = newEmail;
  			return user.save();
		}).then(function(user) {
  			console.log('updated user\'s email with: ' + user.email);
		}).catch(function(err){
  			console.log('error: Cannot find the user with email', email);
		});
	});

}

exports.login_verification = function(u_email, u_pass){
	return new Promise(function(resolve, reject){
		User.findOne({email: u_email}).exec().then((res) => {
			console.log('password in database: ', res.password);
			var login = false;
			(res.password == u_pass)? login = true : login = false;
			resolve(login);
		}).catch(function(err){
  			console.log('error: Cannot find the user with email ', email);
		});;
	});
}

exports.insert_user = function (user){

	var db_promise = new Promise(function (resolve,reject){
		resolve(insertUser(user));
	});
	return db_promise;
}

exports.find_by_email = function (u_email){
	var user;
	var user_query = getUserByEmail(u_email);
	user_query.then(function(usr){
		user = usr;
	});
	return user;
}

exports.connect = function(){
	db.on('error', console.error);
	db.once('open', function(err) {
		if(!err)
			console.log('Connected to database.');
		else
			console.log(err);
	});
	var db_promise = new Promise(function (resolve,reject){
		resolve(mongoose.connect(url));
	});
	return db_promise;
}

exports.verify_email = function(u_email){

}

exports.disconnect = function(){
	return new Promise(function (resolve,reject){
		resolve(mongoose.connection.close());
	});
}

//*********** Function implementation *********** 

function loadSchemas(){
	var eventSchema = mongoose.Schema({
		name: {type: String, unique: true}
	});

	var preferenceSchema = mongoose.Schema({
		city: {type: String, unique: true},
		occassion: String,
		age_appr: Number,
		leaving: Date,
		returning: Date,
		ideal_opt: String,
		budget: Number
	});

	var plannerSchema = mongoose.Schema({
		prefereces: [preferenceSchema],
		events: [eventSchema],
		isCurrent: Boolean
	});

	var userSchema = mongoose.Schema({
		name: String,
		email: String,
		password: String,
		planner: plannerSchema
	});

	var user = mongoose.model('eVaca', userSchema);
	console.log('User schema created.');
	return user;
}

function getUserByEmail(u_email){
	var user = User.findOne({email: u_email}).exec();
	//console.log(user.password);
	return user;
}



function insertUser(user){
	console.log(user.password);
	newUser = new User({
		name: user.name,
		email: user.email,
		password: user.password,
		planner: user.planner
	});
	console.log('About to insert the user');
	newUser.save(function(err){
    	if(!err){
      		console.log("User added to db.");
    	}else{
      		console.error(err);
    	}
  	});
}
