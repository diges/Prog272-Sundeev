//this file to isolate most of my code in one plase as much as possible


var fs = require('fs');
var qm = require('./QueryMongo');
var queryMongo = qm.QueryMongo; 


// function saves changes to config File
function saveConfigToFile(request, response){
	console.log('MyFile.js:saveConfigToFile function called');
	var object  = JSON.stringify(request.query.object, null, 4);
	console.log(object);
	var fName  = request.query.fname;
	
	fs.writeFile(fName, object, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log(fName+ " was saved!");
			response.send ({ data: fName+ " was saved!" });
		}
	});
	
	
}


// function updates collection
function saveConfigMongo(request, response) { 'use strict';
	console.log('MyFile.js:saveConfigMongo function called');
	var filter  = request.query.filter;
	var object  = request.query.object;
	var colName  = request.query.collname;
	
	var objectToInsert = { 
		query: filter,
		update: {
			$set: { "fileContent" : object }
		}         
	};

	queryMongo.updateCollection(response, objectToInsert, colName);
}



function readConfig (request, response) { 'use strict';
	console.log('MyFile.js:readConfig function called');
	var filter  = request.query.filter;
	var colName  = request.query.collname;
	console.log(filter);
	console.log(colName);

	queryMongo.getDocumentsAll(response, colName,filter);

};


//uploads MD files to specified collection
function pushUpMD (request, response) { 'use strict';
	console.log('MyFile.js:pushUpMD function called');
	
	//var colName="filesCollection";
	//var path = './md-test/';
	
	var colName= request.query.collname;
	var path = request.query.path;
	var markdownName = request.query.markdownarr;
	
	var i = markdownName.length;
	
	while(i--){
		console.log(path+markdownName[i]);
		var jsonObject = queryMongo.readMarkDown(markdownName[i], path+markdownName[i]);
		queryMongo.insertIntoCollection(response, colName, jsonObject);
	}
	response.send({ data: "All files imported" });
};

//dowloads MD files to specified path from collection, filter
function pullDownMD (request, response) { 'use strict';
	console.log('MyFile.js:pullDownMD function called');
	//var filter = { "title" : "sonnet1.md"};
	//var pathOut = './md-test/new';
	
	var colName= request.query.collname;
	var pathOut = request.query.path;
	var filter=request.query.filter;
	
	queryMongo.readFileOut(response, colName, pathOut, filter);
	response.send({ data: "All files saved to "+ pathOut});
};

//Function for uploading any file to any collection //issue  forfuture fix: add feature such as replace data in collection or append
function pushUpFile (request, response) { 'use strict';
	console.log('MyFile.js:pushUpFile function called');
	
	var fileName = request.query.filename;
	var filePath = request.query.path;
	var colName = request.query.collname;
	var type = request.query.type;
	var comments = request.query.comments;
	
	//clear collection
		queryMongo.removeAll(response, colName)
	
	filePath=(filePath!=='')?filePath:'./';
	
	var fileNameArr=fileName.replace(/ /g,'').split(",");
	var i = fileNameArr.length;
	
	while(i--){
		
		console.log(filePath+fileNameArr[i]);
		
		var meta = '{ \"path\":\"'+filePath + '\",'+
				 '\"name\":\"'+fileNameArr[i] + '\",'+
				 '\"type\":\"'+type + '\",'+
				 //'\"dateOfImport\":\"'+new Date().now() +  '@' + new Date().timeNow() + '\",'+
				 '\"comments\":\"'+comments + '\"}'
		meta=JSON.parse(meta);
		
		var jsonObject = queryMongo.readFile(fileNameArr[i], filePath+fileNameArr[i],meta);
		
		queryMongo.insertIntoCollection(response, colName, jsonObject);

	}
	response.send({ data: "insert succeeded"});


};

//Function for downloading all docs/filteres collection to any path
function pullDownFile (request, response) { 'use strict';
	console.log('MyFile.js:pullDownMD function called');
	//var filter = { "title" : "sonnet1.md"};
		//use filter to findspecific specific config file... or blank for all
	var filter='';
		//This part will be changed in final project
	var colName = 'FilesConfig';
	
	//By using 'filter' amd 'path' any config file could be  selected and rstored to any location, '' - original loation
	queryMongo.readFileOut(response, colName,'',filter);

};


exports.pushUpMD = pushUpMD;
exports.pullDownMD = pullDownMD;
exports.pushUpFile = pushUpFile;
exports.pullDownFile =pullDownFile;
exports.readConfig=readConfig;
exports.saveConfigMongo=saveConfigMongo;
exports.saveConfigToFile=saveConfigToFile;
