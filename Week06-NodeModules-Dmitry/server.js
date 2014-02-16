/**
 * @author Dmitry
 */

var MathMod = require('./Library/basicMath');
var feetMod = require('./Public/feetToMilles');
var squareMod = require('./square');
var varA=10;
var varB=20;

console.log("basicMath.add returns: " + MathMod.myMath.add(varA,varB));
console.log("basicMath.substract returns: " + MathMod.myMath.substract(varA,varB));
console.log("basicMath.myltiplay returns: " + MathMod.myMath.myltiplay(varA,varB));
console.log("feetToMiiles returns:"+ feetMod.myConverter.feetToMiiles(varA*varB) + " Miles in "+(varA*varB)+" foot :)"); 
console.log("square returns: " + squareMod.mySquare.square(varA));





