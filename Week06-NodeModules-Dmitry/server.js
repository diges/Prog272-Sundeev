/**
 * @author Dmitry
 */

var basicMath = require('Library/basicMath');
var feetToMiiles = require('Library/feetToMiiles');
var square = require('square');
var varA=10;
var varB=20;

console.log("basicMath.add returns: " + basicMath.add(varA,varB));
console.log("basicMath.substract returns: " + basicMath.substract(varA,varB));
console.log("basicMath.myltiplay returns: " + basicMath.myltiplay(varA,varB));
console.log("feetToMiiles returns:"+feetToMiiles.feetToMiiles(varA*varB)); // multiplication just to  make the number larger :)
console.log("square. returns: " + square.square(varA));





