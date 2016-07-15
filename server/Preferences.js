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
     constructor(dest,budget,b_date,return_date,age_st,age_end){
          this.theme = new Array();
          this.ageFrom = age_st;
          this.ageTo = age_end;
          this.budget = budget;
          if(validLocation(this.destination)){
               this.destination = dest;
          }
          if(validDate(b_date,return_date)){

               this.begin_date = b_date;
               this.return_date = return_date;
          }
     }

     //Set the location for this preference profile
     set setLocation(dest){
          if(validLocation(this.destination)){
               this.destination = dest;
          }
     }

     set setBudget(budget){
          this.budget = budget;
     }
}

//Set arriving and returning date
Preferences.prototype.setAgeRange = function(fromDate,toDate){
     this.begin_date = fromDate;
     this.return_date = toDate;
}

//Set arriving and returning date
Preferences.prototype.addThemes = function(new_theme){
     this.theme.push(new_theme);
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

/** ****************************************************************************
  * Name:       validDate()
  *             Function validates that user has inputted a valid date
  *
  * @param      destination :: string
  * @returns    boolean true or false
  *****************************************************************************/
function validDate(start,return1){
     return true;
}



module.exports = Preferences;
//******************************************************************************
