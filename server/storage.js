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
var User;
loadSchemas();
exports.User = User;

//*********** Exported Functions ***************

exports.connect = function(){
	db.on('error', console.error);
	db.once('open', function(err) {
		if(!err)
			console.log('Connected to database.');
		else
			console.log(err);
	});
	return new Promise(function (resolve,reject){
		resolve(mongoose.connect(url));
	});
}

exports.disconnect = function(){
	return new Promise(function (resolve,reject){
		resolve(mongoose.connection.close());
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
  			console.log('error: Cannot find the user with email ', u_email);
				resolve(false);
		});
	});
}

exports.find_by_email = function (u_email){
	return new Promise(function(resolve, reject){
		User.findOne({email: u_email}).exec().then(res => {
			console.log("find by email ::"+res);
			resolve(res);
		}).catch(function(err){
			console.log('error: Cannot find the user. The user may not be registered with that email.');
  			resolve(false);
		});
	});
}

exports.updateUserEmail = function(email, newEmail){
	return new Promise(function(resolve, reject){
		User.findOne({email: email}).exec().then(res => {
  			res.email = newEmail;
  			res.save().then((res) => {
    			console.log('User\'s email updated from ' + email +' to '+ newEmail);
    			resolve(true);
  			}).catch(function(err){
  				console.log('error: Cannot insert the user. Possible duplicate email.');
  				resolve(false);
			});
		}).catch(function(err){
  			console.log('error: Cannot find the user with email.', email);
  			resolve(false);
		});
	});
}

exports.updateUserPassword = function(email, newPass){
	return new Promise(function(resolve, reject){
		User.findOne({email: email}).exec().then(res => {
  			res.password = newPass;
  			res.save().then((res) => {
    			console.log('User\'s password updated.');
    			resolve(true);
  			}).catch(function(err){
  				console.log('error: Cannot save the user.');
  				resolve(false);
			});
		}).catch(function(err){
  			console.log('error: Cannot find the user with email', email);
  			resolve(false);
		});
	});
}

exports.updateUserName = function(email, newName){
	return new Promise(function(resolve, reject){
		User.findOne({email: email}).exec().then(res => {
  			res.name = newName;
  			res.save().then((res) => {
    			console.log('User\'s name updated.');
    			resolve(true);
  			}).catch(function(err){
  				console.log('error: Cannot save the user.');
  				resolve(false);
			});
		}).catch(function(err){
  			console.log('error: Cannot find the user with email', email);
  			resolve(false);
		});
	});
}

exports.insert_user = function (user){
	return new Promise(function (resolve,reject){
		var newUser = new User({
			name: user.name,
			email: user.email,
			password: user.password,
			planner: user.planner
		});
		newUser.save().then((res) => {
			console.log("this user is inserted :: "+res);
    		console.log('User '+newUser.name+' added to db.');
    		resolve(true);
  		}).catch(function(err){
  			console.log('error: Cannot insert the user. Possible email duplicated.');
  			resolve(false);
		});
	});
}

exports.removeUser = function(email){
	return new Promise(function(resolve, reject) {
		User.findOneAndRemove({email: email}).exec().then(res => {
			if(res == null){
				console.log('User '+email+' doesn\'t exist');
				resolve(false);
			}else{
				console.log('User '+email+' was removed.');
				resolve(true);
			}
		}).catch(function(err){
			console.log('error: Query didn\'t finish.');
  			resolve(false);
        });
	});
}

exports.addEventToUser = function(email, plannerID, eventname) {
    return new Promise(function(resolve, reject) {
        User.findOne({ email: email }).exec().then(res => {
        		console.log('User found.');
        		var p = res.planner.id(plannerID);
        		p.events.push({name: eventname});
        		console.log('Element pushed.')
            	res.save().then((res) => {
                	console.log('Data saved.');
                	resolve(true);
            	}).catch(function(err) {
                	console.log('error: Cannot save the user.');
                	resolve(false);
            	});
        }).catch(function(err){
			console.log('error: Cannot find the user. The user may not be registered with that email.');
  			resolve(false);
        });
	});
};

exports.removeEvent = function(email, plannerID, eventID){
	return new Promise(function(resolve, reject) {
        User.findOne({ email: email }).exec().then(res => {
        		console.log('User found.');
        		res.planner.id(plannerID).events.id(eventID).remove();
        		console.log('Event removed.')
            	res.save().then((res) => {
                	console.log('Data saved.');
                	resolve(true);
            	}).catch(function(err) {
                	console.log('error: Cannot save the user.');
                	resolve(false);
            	});
        }).catch(function(err){
			console.log('error: Either the user or the planner don\'t exist');
  			resolve(false);
        });
	});
}

/*exports.addEventToUser = function(email, plannerID, eventname) {
    return new Promise(function(resolve, reject) {
        console.log('Preparing to find the user.');
        User.findOne({ email: email }).exec().then(res => {
        	/*var i = 0;
        	console.log('Preparing to find planner.');
        	while(i < res.planner.length){
        		if(res.planner[i]._id == plannerID){
        			break;
        		}
        		i++;
        	}
        	if(i == res.planner.length){
        		console.log('error: Cannot find the planner', plannerID);
        		resolve(false);
        	}else{
        		console.log('Planner found')
        		res.planner[i].events.push({name: eventname});
            	res.save().then((res) => {
                	console.log('Data saved.');
                	resolve(true);
            	}).catch(function(err) {
                	console.log('error: Cannot save the user.');
                	resolve(false);
            	});
        	}
        });
	});
}*/

exports.addPlannerToUser = function(email, newPlanner){
	return new Promise(function(resolve, reject){
		User.findOne({ email: email }).exec().then(res => {
			console.log("ADDPLANNERTOUSER :: "  + newPlanner.events + " "+ newPlanner.location);
			res.planner.push({
				//isCurrent: newPlanner.isCurrent,
				events: newPlanner.events,
				location: newPlanner.location
				//preferences: newPlanner.preferences
			});
			res.save().then((res) => {
    			console.log('Planner successfully added to ', email);
    			resolve(true);
  			}).catch(function(err){
  				console.log('error: Cannot save the planner of', email);
  				resolve(false);
			});
		}).catch(function(err){
			console.log('error: Cannot insert the planner to', email);
  			resolve(false);
		});
	});
}

exports.removePlanner = function(email, plannerID){
	return new Promise(function(resolve, reject) {
        User.findOne({ email: email }).exec().then(res => {
        		console.log('User found.');
			console.log('planner we want to delete :: '+ plannerID);
			console.log(res.planner);
        		res.planner.id(plannerID).remove();
        		console.log('Planner removed.')
            	res.save().then((res) => {
                	console.log('Data saved.');
                	resolve(true);
            	}).catch(function(err) {
                	console.log('error: Cannot save the user.');
                	resolve(false);
            	});
        }).catch(function(err){
			console.log('error: Either the user or the planner don\'t exist');
  			resolve(false);
        });
	});
}


exports.verify_email = function(u_email){

}

//*********** Function implementation ***********

function loadSchemas(){

	var preferenceSchema = mongoose.Schema({
		city: String,
		occassion: String,
		age_appr: Number,
		leaving: Date,
		returning: Date,
		ideal_opt: String,
		budget: Number
	});

	var plannerSchema = mongoose.Schema({
		preferences: preferenceSchema,
		location: String,
		events: [{name: String,
				image_url: String
		}]
	});

	var userSchema = mongoose.Schema({
		name: String,
		email: {type: String, unique: true},
		password: String,
		planner: [plannerSchema]
	});

	User = mongoose.model('eVaca', userSchema);
	console.log('User schema created.');
}
