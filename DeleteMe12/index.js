/**
 * @author dmitry.sundeev
 */

var foo = {
	firstName: "Dimitry",
	lastName: "Sundev",
	fullName: function() { 'use strict';
		return this.firstName + ' ' + this.lastName;
	}
};

