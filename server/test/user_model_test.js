var expect = require("chai").expect;
var User = require("../models/user.model.js");
var email='evaca8420@gmail.com';
var password='evacaproject';
var name='Leon';
var plannerID=1;
var itemID=1;

describe("Functions that users can perform",function(){

	 it("Saves user to the database",function(){
		var User1= new User(email);
		User1.setPassword(password);
		User1.setName(name);
		User1.save().then(results=>{
			 storage.find_by_email(email).then(res_find => {
				  console.log("first planner to be deleted "+res_find.planner[0]._id);
				  console.log("email from the person to be deleted = "+ email);
				  User1.delete_planner(res_find.planner[0]._id).then(r =>
					   {
						   expect(results);
					   });
			 })
		});
	 });
	 
	 it("Add a planner for the user",function(){
		 var User1= new User(email);
		  User1.add_planner(5,155,'Chicago','nightlife',email)
          .then(result => {
			   expect(result).to.be.an('object');
          });
     });
	 
	 it("Load user's information from database",function(){
		 var User1= new User(email);
		 User1.load(email).then(dbres => expect(dbres).to.be.an('object'));
	 })
	 it("Deletes a given event",function(){
		  var User1= new User(email);
		 User1.delete_event(plannerID,itemID);
	 })
	 it("Deletes a given planner",function(){
		  var User1= new User(email);
		 User1.delete_planner(itemID);
	 })
})