/**
 * @author Dmitry
 */
 
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var collectionName='test_md';
var exec = require('child_process').exec;
 
var ReadFileMD = (function() {'use strict';
 
    var response = null;
	var database = null;
	var url = null;
    
    function ReadFileMD() {
		url = 'mongodb://127.0.0.1:27017/test';
 
    }
    
    var getDB = function(func) {
		console.log('Called getDB');
		if (database !== null) {
			console.log('database exists');
			database.open(function(err, database) {
				if (err) {
					throw err;
				}
				func(database);
			});
		} else {
			console.log('Querying for database');
			console.log(url);
			MongoClient.connect(url, function(err, databaseResult) {
				if (err) {
					throw err;
				}
				database = databaseResult;
				func(database);
			});
		}
	};
	
	
	ReadFileMD.prototype.getCollection = function(initResponse) {
		console.log("getCollection called");
		response = initResponse;
		getDB(function getCol(database) {
			var collection = database.collection(collectionName);

			// Send the collection to the client.
			collection.find().toArray(function(err, theArray) {
				console.dir(theArray);
				database.close();
				response.send(theArray);
			});
		});
	};
    
    
    
    ReadFileMD.prototype.loadtoDB = function(result, fileContent){
		console.log('loadtoDB called');
		getDB(function getCol(database) {
			console.log('IngetDataCallback');
			insertIntoCollection(database, collectionName, { "filename": "sourceFile.md", "content":fileContent});
		});
		
	};
	
	var insertIntoCollection = function(db, collectionName, objectToInsert) {
 
        var collection = db.collection(collectionName);
        collection.insert(objectToInsert, function(err, docs) {
            if (err) {
                throw err;
            }
            console.log("insert succeeded");
            db.close();
        });
    };
	
	ReadFileMD.prototype.saveToHTML = function(result){
		console.log('saveToHTML Called');
		getDB(function getCol(database) {
			getData(database, result);
		});
	};
	 
   
    
    var getData = function(db, response) {
		
		var collection = db.collection(collectionName);
    	collection.find({"filename": "sourceFile.md"}).toArray(function(err, theArray) {

            var body = theArray[0].content
            console.log(body);
				
			fs.writeFile(__dirname + '/sources/sourceFileOut.md', body, function (err) {
			  if (err) throw err;
			  console.log('It\'s saved!');
			  db.close();
			  
			  exec('pandoc -t html5 -o ./sources/sourceFileOut.html ./sources/sourceFileOut.md', function callback(error, stdout, stderr) {
					if (err) throw err;
					console.log('File created');
					
					var htmlbody = fs.readFileSync(__dirname + '/sources/sourceFileOut.html');
					response.send(htmlbody);
					
					db.close();	
					
				});
			  
			});	

        });
	};
    
    
    return ReadFileMD;
 
})();

exports.readFileMD = new ReadFileMD();

