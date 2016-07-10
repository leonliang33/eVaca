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

     //Set the location for this preference profile
     set setLocation(dest){
          if(validLocation(this.destination)){
               this.destination = dest;
          }
     }

     //Set the date that user is planning to go on this vacation
     set setBeginDate(bd){
          this.begin_date = bd;
     }

     //Set the date the user is planning to return from vacation
     set setReturnDate(rd){
          this.return_date = rd;
     }
}

/** ****************************************************************************
  * Name:       validLocation()
  *             Function validates that user has inputted a valid destination
  *
  * @param      destination :: string
  * @returns    boolean true or false
  *****************************************************************************/
function validLocation(dest){
     return true;
}



module.exports = Preferences;
//******************************************************************************
