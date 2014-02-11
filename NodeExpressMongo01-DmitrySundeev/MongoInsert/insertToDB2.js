
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

var url01 = 'mongodb://127.0.0.1:27017/test';
var url02 = 'mongodb://192.168.2.19:27017/test';

  MongoClient.connect(url01, function(err, db) {
  if(err) throw err;

  var collection = db.collection('test_data_Dmitry');
  var DBid=1000;
    
  for (var i=1; i<256;i++) {
	DBid=1000+i;
    collection.insert({
			
			"firstName":"Rita"+(1000+i),
			"lastName":"Hill"+(1000+i),
			"Address": (1000+i)+" Ruby Street Bellevue, WA 98002"
		}, function(err, docs) {

    //    collection.count(function(err, count) {
    //    console.log(format("count = %s", count));
     //   });

      // Locate all the entries using find
  //    collection.find().toArray(function(err, results) {
  //      console.dir(results);
        // Let's close the db
       db.close();
  //    });
    });
  }
})
