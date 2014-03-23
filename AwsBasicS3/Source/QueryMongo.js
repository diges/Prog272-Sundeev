/**
 * @author Charlie Calvert
 */

// http://mongodb.github.io/node-mongodb-native/api-generated/db.html
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
// var mongoServer = mongodb.Server;
var fs = require('fs');
var exec = require('child_process').exec;
assert = require('assert');

var QueryMongo = (function() {'use strict';

	var response = null;
	var database = null;
	var url = null;
	var collectionName = 'MongoTalk04Data';
	/*
	 * Normally we do not close the database. If you have more
	 * more than one MongoClient then call it, otherwise, don't 
	 * call it. So we default to false.
	 */
	var callClose = false;

	function QueryMongo() {
		var urls = ['mongodb://127.0.0.1:27017/test',
			'mongodb://192.168.0.10:27017/test',
			'mongodb://dbadmin:diges20@ds053728.mongolab.com:53728/dmitrydb'];

		url = urls[0];
	}

	function showDatabase(database, deep) {
		// Make deep default to false
		deep = typeof deep !== 'undefined' ? deep : false;
		console.log("Deep is: " + deep);
		for (var key in database) {
			var obj = database[key];
			if (typeof obj !== 'function') {
				console.log(key + ": ");
				console.log(obj);
			}
			if (deep === true) {
				for (var prop in obj) {
					// Check that this is not an inherited property from the prototype
					if(obj.hasOwnProperty(prop)){
						console.log("Database looks like this: "  + prop + " = " + obj[prop]);
					}
				}
			}
		}
	}

	var getDatabase = function(callback) {
		console.log('Called QueryMongo.getDatabase: ');
		if (database !== null) {
			console.log('database exists');
			// showDatabase(database);
			if (database.openCalled === false) {
				console.log('calling open database');
				database.open(function(err, database) {
					console.log('In database open callback');
					if (err) {
						console.log("found err");
						throw err;
					}
					callback(database);
				});
			} else {
				callback(database);
			}
		} else {
			console.log('Querying for database: ' + url);
			MongoClient.connect(url, function(err, databaseResult) {
				/* if (err) {
					throw err;
				}*/
				assert.equal(null, err);
				assert.ok(databaseResult != null);
				database = databaseResult;
				// showDatabase(database);
				callback(database);
			});
		}
	};

	// If you have only on MongoClient, there is no need to call close.
	var closeDatabase = function() {
		database.close();
	};



	// Get a specific number of documents from the collection
	QueryMongo.prototype.getDocuments = function(initResponse, count) {
		console.log("QueryMongo.getDocuments called");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection(collectionName);

			// Send the collection to the client.
			collection.find().limit(count).toArray(function(err, theArray) {
				console.dir(theArray);
				if (callClose) { closeDatabase(); }
				response.send(theArray);
			});
		});
	};

	// Get the number of documents in the collection
	QueryMongo.prototype.getDocumentCount = function(initResponse) {
		console.log("QueryMongo.getDocumentCount called");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection(collectionName);

			var count = collection.count(function(err, result) {
				if (err) {
					throw err;
				}
				console.log('sending back result: ' + result);
				if (callClose) { closeDatabase(); }
				response.send({ "documentCount": result });
			});
		});
	};


	// Will create collection if it does not exist
	QueryMongo.prototype.insertIntoCollection = function(response, myCollectionName, objectToInsert) {
		console.log("QueryMongo.insertIntoCollection called");
		getDatabase(function getCol(database) {
			var collection = database.collection(myCollectionName);
			collection.insert(objectToInsert, function(err, docs) {
				if (err) {
					throw err;
				}
				if (callClose) { closeDatabase(); }
				console.log("insert succeeded");
				response.send({ result: "Success", mongoDocument: docs });
			});
		});
	};
	
		// Will create collection if it does not exist
	QueryMongo.prototype.updateCollection = function(response, objectToInsert,myCollectionName) {
		console.log("QueryMongo.updateCollection called");
		getDatabase(function getCol(database) {
		    console.log("In the update callback");
			var collection = database.collection(myCollectionName);
			collection.update(objectToInsert.query, objectToInsert.update, function(err, docs) {
				if (err) {
					throw err;
				}
				if (callClose) { closeDatabase(); }
				console.log("update succeeded");
				response.send({ result: "Success", mongoDocument: docs });
			});
		});
	};
	
	
		
		// Get a document from a collection with filter
	QueryMongo.prototype.getDocumentsAll = function(initResponse, myCollectionName,filter) {
		console.log("QueryMongo.getDocumentsAll called");
		response = initResponse; 
		getDatabase(function getCol(database) {
			var collection = database.collection(myCollectionName);

			// Send the collection to the client.
			collection.find(filter).limit(1).toArray(function(err, theArray) {
				console.log("The Array in getDocumentsAll: " + JSON.stringify(theArray, null, 4));
				if (callClose) { closeDatabase(); } 
				//console.log(typeof response);
				//console.log(typeof theArray);
				response.send(theArray[0].fileContent);
			});
		});
	};
	
	
	

	QueryMongo.prototype.readMarkDown = function(title, fileName) {
		console.log("readMarkDown: " + fileName);
		var myJson = {
			"title": null,
			"text": null
		};

		myJson.title = title;
		var fileContent = fs.readFileSync(fileName, 'utf8');
		myJson.text = fileContent;

		return myJson;
	};

	//second version of almost the same function as readMarkDown
	QueryMongo.prototype.readFile = function(title, fileName, metaOBJ) {
		console.log("read file: " + fileName);
		var myJson = {
			"title": null,
			"fileContent": null,
			"meta": null
		};

		myJson.title = title;
		var fileContent = fs.readFileSync(fileName, 'utf8');
		myJson.fileContent = fileContent;
		myJson.meta = metaOBJ;
		
		console.log(myJson);

		return myJson;
	};

	//This function adds specific MarkDown formating to JSON object
	QueryMongo.prototype.readFileOutJsonToMD = function(response, myCollectionName, path, filter) {
		console.log("QueryMongo.readFileOutJsonToMD called");
		getDatabase(function(database) {
			var collection = database.collection(myCollectionName);
			collection.find(filter).limit(1).toArray(function(err, theArray) {
				if (err) {
					throw err;
				}
				if (callClose) { closeDatabase(); }
				
				var mypath=path;
				//console.log(JSON.stringify(theArray[0].title, null, 4));
				
				var MDobj=theArray[0].author+'\n'+
							'=====================\n'+
							theArray[0].title+
							'\n---------------\n'+
							theArray[0].content;
				//console.log(MDobj);

				writeFile(response,mypath+theArray[0].title.replace(/ /g,'')+'.md',MDobj); 

				response.send({ result: "Success" });

			});
		});
	};


	//this function reads file out, has a lot of ifstatements to be able export all differents JSON structures stored in MongoDB
	QueryMongo.prototype.readFileOut = function(response, myCollectionName, path, filter) {
		console.log("readFileOut called");
		getDatabase(function(database) {
			var collection = database.collection(myCollectionName);
			collection.find(filter).toArray(function(err, theArray) {
				if (err) {
					throw err;
				}
				if (callClose) { closeDatabase(); }
				
				var i = theArray.length;
				//read all docs to files
				
				var mypath=path;
				
				while (i--){

					if (theArray[i].meta!== undefined) {
						if ((path==='')||((path === undefined))) {
							console.log('Path readed from Meta Data');
							mypath=theArray[i].meta.path;
						}
						
						//by default I want to use a name of the file from meta.name if it is exist
						
						if ((theArray[i].meta.name!=='')||((theArray[i].meta.name !== undefined))) {
							console.log('File Name readed from MetaData');
							writeFile(response,mypath+theArray[i].meta.name,theArray[i].fileContent);
							
						} else {
							console.log('==Title==used==as==the==NameOfFile==');
							writeFile(response,mypath+theArray[i].title,theArray[i].fileContent);
						}
					} else {
						writeFile(response,mypath+theArray[i].title,theArray[i].text); //this need to be fixed later !!!
					}
					
				}
				
				response.send({ result: "Success", mongoDocCount: theArray.length });

			});
		});
	};
	

	var writeFile = function(response, fileNime, jsonString) {
		fs.writeFile(fileNime, jsonString, function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log(fileNime);
				console.log("The file was saved!");
				
				// as I understen in this assignment we dont need to convert it.
				//convertToHtml(response);
			}
		});
	};

	var convertToHtml = function(response)	{
		exec('pandoc -t html5 test.md', function callback(error, stdout, stderr) {
			// Read in the HTML send the HTML to the client
			console.log("convertToHtml was called");
			response.send(stdout);
		});
	};

	QueryMongo.prototype.removeById = function(id) {
		console.log("QueryMongo.removeById called");
		getDatabase(function getCol(database) {
			var collection = database.collection(collectionName);
			collection.remove({ "_id" : mongodb.ObjectID("52fc4547640b76180b9fb9c4")}, function(err, data) {
				if (err) {
					throw err;
				}
				if (callClose) { closeDatabase(); }
				console.log("Item deleted");
			});

		});
	};

	QueryMongo.prototype.removeAll = function(response,myCollectionName) {
		console.log("QueryMongo.removeAll called");
		getDatabase(function getCol(database) {
			var collection = database.collection(myCollectionName);
			collection.remove(function(err, data) {
				if (err) {
					throw err;
				}
				if (callClose) { closeDatabase(); }
				console.log("Item deleted");
				response.send({ result: "removeAll Called"});
			});

		});
	};

	return QueryMongo;

})();


exports.QueryMongo = new QueryMongo();
