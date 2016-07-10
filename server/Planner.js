/************************************************************ @fileoverview<pre>
	Name:           Planner.js
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
var mongoose = require("mongoose");
var Preference = require('./Preferences.js');
var Events = require('./Events.js');
var users = require('./models/user.model.js');
//******************************* Global Variables *****************************
//var Schema = mongoose.Schema;
var cost,time;
//******************************************************************************

//******************************* Object Creation *****************************
class Planner{
     constructor(){
          this.Preferences;
          this.Events = new Array();
     }

}


module.exports = Planner;

//******************************************************************************
