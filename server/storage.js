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
//*********** Global variables *****************

var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/test";
var db = mongoose.connection;
var User = loadSchemas();
exports.User = User;

//*********** Exported Functions ***************

exports.login_verification = function(u_email, u_pass){
	var login = false;
	console.log(u_email);
	var user_query = getUserByEmail(u_email);
	//console.log(user_query);
	console.log('Done with exec');
	user_query.then(function(usr){
		//console.log(usr);
		if(!usr){
			console.log("No user found with that email.");
		}else
			login = usr.comparePassword(u_pass);
	});
	console.log('Done with then');
	return login;
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

exports.disconnect = function(){
	var db_promise = new Promise(function (resolve,reject){
		resolve(mongoose.connection.close());
	});
	return db_promise;
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

	userSchema.methods.comparePassword = function(psw){
		console.log(password);
		if(this.password == psw){
			console.log('Email and password verified.');
			return true;
		}
		console.log('Incorrect email or password.');
		return false;
	};

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








