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

console.log(foo.firstName);
console.log(foo.lastName);
console.log(foo.fullName());
