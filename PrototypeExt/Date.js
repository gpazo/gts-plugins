/*
Copyright © 2012, GlitchTech Science
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * Format the date for display
 * @requires enyo.g11n
 * @augments Date.prototype
 *
 * @param {object}	[dtFormat]	Pattern to format date by
 * @param {string}	[dtFormat.date="medium"]	Format pattern for date ("short", "medium", "long", custom pattern)
 * @param {string}	[dtFormat.time="short"]	Format pattern for date ("short, "medium", "long", custom pattern)
 *
 * @return {string}	Formatted date
 */
Date.prototype.format = function( dtFormat, locale ) {

	if( enyo.g11n ) {

		if( dtFormat == "special" ) {

			dtFormat = { date: "yyyy-MM-dd", time: "HH:mm:ss" };
		} else if( typeof( dtFormat ) === "undefined" ) {

			dtFormat = { date: "medium", time: "short" };
		} else if( !enyo.isString( dtFormat ) ) {

			if( typeof( dtFormat['date'] ) === "undefined" ) {

				dtFormat['date'] = "medium";
			} else if( typeof( dtFormat['time'] ) === "undefined" ) {

				dtFormat['time'] = "short";
			}
		}

		try {

			var fmt = new enyo.g11n.DateFmt( dtFormat );

			return fmt.format( this );
		} catch( err ) {

			enyo.error( "Date.prototype.format error: ", err );
			return this.toString();
		}
	}

	return "";
}

/**
 * Creates a new date object and formats it
 * @see Date.prototype#format
 * @augments Date
 *
 * @param {string|object}	dtFormat
 * @return {string}	formatted date
 */
Date.format = function( dtFormat ) {

	return( ( new Date() ).format( dtFormat ) );
}

/**
 * Changes date to start of month, at the start of the day
 * @augments Date.prototype
 *
 * @return {int}
 */
Date.prototype.setStartOfMonth = function() {

	this.setDate( 1 );

	this.setHours( 0 );
	this.setMinutes( 0 );
	this.setSeconds( 0 );
	this.setMilliseconds( 0 );

	return Date.parse( this );
}

/**
 * Changes date to end of month, at the end of the day
 * @augments Date.prototype
 *
 * @return {int}
 */
Date.prototype.setEndOfMonth = function() {

	this.setDate( this.daysInMonth() );

	this.setHours( 23 );
	this.setMinutes( 59 );
	this.setSeconds( 59 );
	this.setMilliseconds( 999 );

	return Date.parse( this );
}

/**
 * Returns number of days in current month
 * @augments Date.prototype
 *
 * @return {int}
 */
Date.prototype.daysInMonth = function() {

	return( 32 - ( new Date( this.getFullYear(), this.getMonth(), 32 ) ).getDate() );
}

/**
 * Attempts to convert string to date object
 * @augments Date
 *
 * @param {string}	inString	Date string
 * @return {int}	Date as number of milliseconds since Jan 1, 1970
 */
Date.deformat = function( inString ) {
	//Should parse the "special" format from above just fine

	var base = Date.parse( inString );

	if( isNaN( base ) ) {
		//Attempt to fix string by changing A.M. and P.M. to am and pm (case insensitive)

		base = Date.deformat( inString.replace( /A\.M\./i, "am" ).replace( /P\.M\./i, "pm" ) );
	}

	return( base );
}

/**
 * Checks for a valid date object
 * @augments Date
 *
 * @param {object}	obj	Object for date testing
 * @return {boolean}	If object is of DATE_CLASS && parsing results in a valid number
 */
Date.validDate = function( obj ) {

	return gts.Object.isDate( obj ) && !isNaN( obj.getTime() );
}
