 //not working on my computer :(
 //throw an error: Failed to load c++ bson extension, using pure JS version... 
  
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

var QueryMongo = (function() {

    var url01 = 'mongodb://127.0.0.1:27017/test';
    var url02 = 'mongodb://192.168.2.19:27017/test';
    
    var that=this;

    function QueryMongo() {
		
		

        // Open the test database that comes with MongoDb
        MongoClient.connect(url01, function(err, database) {
            if (err) {
                throw err;
            }
            
            var collection = database.collection('test_data_Dmitry');

            for (var i=1; i<256;i++) {
				DBid=1000+i;
				insertCollection(database, 'test_data_Dmitry', {
					"firstName":"Rita"+DBid,
					"lastName":"Hill"+DBid,
					"Address": DBid+" Ruby Street Bellevue, WA 98002"
				});
			}

        });
    }

    var getCollection = function(database) {

        //var collection = database.collection('test_data_Dmitry');

        // Count documents in the collection
        collection.count(function(err, count) {
            console.log(format("count = %s", count));
        });

        // View the collection
        collection.find().toArray(function(err, results) {
            console.dir(results);
            database.close();
        });

    };

    // Will create collection if it does not exist
    var insertIntoCollection = function(db, collectionName, objectToInsert) {

        var collection = db.collection(collectionName);
        collection.insert(objectToInsert, function(err, docs) {
            getCollection(db);
        });
    };

    return QueryMongo;

})();

var q = new QueryMongo();
