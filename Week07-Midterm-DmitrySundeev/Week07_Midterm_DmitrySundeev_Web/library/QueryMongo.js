

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var ColName = "shakespeare";

var QueryMongo = (function() {'use strict';

	var response = null;
	var database = null;
	var url = null;
	
	function QueryMongo() {
		var urls = ['mongodb://127.0.0.1:27017/test',
			'mongodb://192.168.2.19:27017/test',
			'mongodb://192.168.2.34:27017/test',
			'mongodb://192.168.56.101:27017/test'];

		url = urls[0];
	}

	var getDatabase = function(func) {
		console.log('Called getData');
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
	
	QueryMongo.prototype.getCollectionCombo = function(initResponse,id) {
		console.log("getCollectionCombo with ID filter called");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection(ColName);

			// Send the collection to the client.
			collection.findOne({"_id": new ObjectId(id)}, { content:1 },function(err, doc) {
				console.dir(doc);
				database.close();
				response.send(doc);
			});
		});
	};
	
	
	QueryMongo.prototype.getCollectionFiltered = function(initResponse,filter) {
		console.log("getCollectionFiltered with filter called");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection(ColName);

			// Send the collection to the client.
			collection.find({"keywords":filter}).toArray(function(err, theArray) {
				console.dir(theArray);
				database.close();
				response.send(theArray);
			});
		});
	};

	QueryMongo.prototype.getCollection = function(initResponse) {
		console.log("getCollection called");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection(ColName);

			// Send the collection to the client.
			collection.find({},{ _id: 1,title:1 }).toArray(function(err, theArray) {
				console.dir(theArray);
				database.close();
				response.send(theArray);
			});
		});
	};
	
		
		// Will create collection if it does not exist
	QueryMongo.prototype.insertIntoCollection = function(objectToInsert) {

		getDatabase(function getCol(database) {
			var collection = database.collection(ColName);
			collection.insert(objectToInsert, function(err, docs) {
				if (err) {
					throw err;
				}
				database.close();
				console.log("insert succeeded");
			});
		});
	};
	

	return QueryMongo;

})();


exports.QueryMongo = new QueryMongo();
