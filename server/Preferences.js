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
          if(validLocation(dest)){
               this.destination = dest;
          }
          if(validDateRange(b_date,return_date)){

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

    //how will location be selected in API?? (City, State), (Zip code), (Geo-Coordinates)

     return true;
}

/** ****************************************************************************
  * Name:       validDateRange()
  *             Function validates that user has inputted a valid date range.
  *
  * @param      startDate :: string
  * @param      returnDate :: string
  * @returns    boolean true or false
  *****************************************************************************/
function validDateRange(startDate,returnDate){

  if(!validDate(startDate) || !validDate(returnDate))
      return false;

   //fetch current date
   var today = new Date();
   var todayDay = today.getDate();
   var todayMonth = today.getMonth()+1;
   var todayYear = today.getFullYear();
   today = todayMonth+'/'+todayDay+'/'+todayYear;

   // Parse the startDate
   var sParts = startDate.split("/");
   var sDay = parseInt(parts[1], 10);
   var sMonth = parseInt(parts[0], 10);
   var sYear = parseInt(parts[2], 10);

   // Parse the returnDate
   var rParts = returnDate.split("/");
   var rDay = parseInt(parts[1], 10);
   var rMonth = parseInt(parts[0], 10);
   var rYear = parseInt(parts[2], 10);

   //make sure start date is today or in future
   if(sYear<todayYear || sMonth<todayMonth || sDay<todayDay)
      return false;

   //make sure returnDate is after startDate
   if(rYear<sYear || rMonth<sMonth || rDay<sDay)
      return false;

    return true;
}

/** ****************************************************************************
  * Name:       validDate()
  *             Function validates that user has inputted a valid date format
                ("mm/dd/yyyy" or "m/d/yyyy").
  *
  * @param      date :: string
  * @returns    boolean true or false
  *****************************************************************************/
function validDate(date){

  // First check for correct format
if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
    return false;

// Parse the date
var parts = dateString.split("/");
var day = parseInt(parts[1], 10);
var month = parseInt(parts[0], 10);
var year = parseInt(parts[2], 10);

// Check the ranges of month and year
if(year < 2000 || year > 3000 || month <= 0 || month > 12)
    return false;

var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

// Adjust for leap years
if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

// Check the range of the day
return day > 0 && day <= monthLength[month - 1];
}



module.exports = Preferences;
//******************************************************************************
