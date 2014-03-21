
var fs = require('fs');
var qm = require('./QueryMongo');
var queryMongo = qm.QueryMongo; 

//this vars could be passed in future for automatisation
var colName="filesCollection";
var path = './md-test/';
var pathOut = './md-test/new';

function pushUpMD (request, response) { 'use strict';
	console.log('pushUpMD function called');
	
	//This part will be replace in the Final Project with walk funtion
	var markdownName = ['sonnet1.md','sonnet2.md','sonnet3.md','sonnet4.md','sonnet5.md'];
	var i = markdownName.length;
	while(i--){
		console.log(path+markdownName[i]);
		var jsonObject = queryMongo.readMarkDown(markdownName[i], path+markdownName[i]);
	queryMongo.insertIntoCollection(response, colName, jsonObject);
	}
	//

};

function pullDownMD (request, response) { 'use strict';
	console.log('pullDownMD function called');
	//var filter = { "title" : "sonnet1.md"};
	var filter='';
	queryMongo.readFileOut(response, colName, pathOut,filter);
	
	
}

function pushUpFile (request, response) { 'use strict';
	console.log('pushUpMD function called');
	
	//This part will be replace in the Final Project with walk funtion
	//var markdownName = ['sonnet1.md','sonnet2.md','sonnet3.md','sonnet4.md','sonnet5.md'];
	var fileNameArr = response.fileNameArr;
	var filePath = response.filePath;
	var coll = response.collectionName;
		
	var i = fileNameArr.length;
	while(i--){
		console.log(path+markdownName[i]);
		var jsonObject = queryMongo.readMarkDown(markdownName[i], path+markdownName[i]);
	queryMongo.insertIntoCollection(response, colName, jsonObject);
	}
	//

};


exports.pushUpMD = pushUpMD;
exports.pullDownMD = pullDownMD;
