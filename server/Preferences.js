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

//******************************* Global Variables *****************************

//******************************************************************************

//******************************* Class Function *****************************
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

     set setLocation(dest){
          if(validLocation(this.destination)){
               this.destination = dest;
          }
     }

     set setBeginDate(bd){
          this.begin_date = bd;
     }

     set setReturnDate(rd){
          this.return_date = rd;
     }
}

function validLocation(dest){
     return true;
}



module.exports.Preferences;
//******************************************************************************
