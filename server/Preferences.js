/************************************************************ @fileoverview<pre>
	Name:           Preferences.js
	Author:         Leon Liang
	Created:        6/15/2016
	For Version:		1.0x
	Modifications:
	Summary:
          Storage javascript.
          All database work should be here :: storing and retrieving of information

</pre>*************************************************************************/
//******************************* Configuration ********************************
/*                       Define Modules Requirement Here                        */
// var mongoose = require("mongoose");

//******************************* Global Variables *****************************
//Place you global variables here.
// var Schema = mongoose.Schema;
//******************************************************************************

//******************************* Class Function *****************************
// var PreferencesSchema = new Schema({
//   location: String,
//   budget: Number,
//   return_date: Date,
//   begin_date: Date
//
// })
//
// PreferencesSchema.methods.view = function view(){
//
// }
//
// var Preference = mongoose.model('Preference',PreferencesSchema);
//
// module.exports = Preference;

// var preferences = Preference.prototype;
//
// function Preference(dest,budget,b_date,return_date){
//      this._dest = dest;
//      this._budget =
// }
"use strict";
class Preferences{
     constructor(dest,budget,b_date,return_date){
          this.budget = budget;
          this.begin_date = b_date;
          this.return_date = return_date;
          if(validLocation(this.destination)){
               this.destination = dest;
          }
     }
}

function validLocation(dest){
     return true;
}

module.exports.Preferences;
//******************************************************************************
