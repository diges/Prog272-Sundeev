
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

var url01 = 'mongodb://127.0.0.1:27017/test';
var url02 = 'mongodb://192.168.2.19:27017/test';

  MongoClient.connect(url01, function(err, db) {
  if(err) throw err;

	var collection = db.collection('test_data_Dmitry');
	collection.remove(function(err) {
		if (err) {
			throw err;
		}
		db.close();
	});

 })
