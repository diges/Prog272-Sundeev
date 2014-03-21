
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
	console.log('pushUpFile function called');
	
	//var markdownName = ['sonnet1.md','sonnet2.md','sonnet3.md','sonnet4.md','sonnet5.md'];
	var fileName = 'MarkdownTransformConfig.json, Options.json';
	var filePath = '';
	var coll = 'configs';
	var type = 'convert';
	var comments = 'AwsBasicS3-Home';
	
	
	//response.send(request.params.files);
	
	fileNameArr=fileNameArr.replace(/ /g,'').split(",");
	if (filePath===''){filePath='./'}// filePath=(filePath!='')?filePath:'./';
		
	var i = fileNameArr.length;
	
	while(i--){
		
		console.log(filePath+fileNameArr[i]);
		
		var meta = '{ path:'+filePath + ','+
				 'name:'+fileNameArr[i] + ','+
				 'type:'+type + ','+
				 'dateOfImport:'+new Date().today() + " @ " + new Date().timeNow() + ','+
				 'comments:'+comments + '}'
	
		console.log(meta);
		
		var jsonObject = queryMongo.readMarkDown(fileNameArr[i], path+markdownName[i],meta);
		queryMongo.insertIntoCollection(response, colName, jsonObject);
		
		
		
		
		//console.log(path+markdownName[i]);
		
		
		
		//var jsonObject = queryMongo.readMarkDown(markdownName[i], path+markdownName[i]);
	//queryMongo.insertIntoCollection(response, colName, jsonObject);
	}
	//

};


exports.pushUpMD = pushUpMD;
exports.pullDownMD = pullDownMD;
exports.pushUpFile = pushUpFile;
