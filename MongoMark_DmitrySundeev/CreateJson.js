/**
 * @author Dmitry
 */
 
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs = require('fs');
var collectionName='test_md';
 
var ReadFileMD = (function() {
 
    var url01 = 'mongodb://127.0.0.1:27017/test';
    
    function ReadFileMD() {
 
    }
    
    ReadFileMD.prototype.loadtoDB = function(result, fileContent){
		console.log('loadtoDB called');
		MongoClient.connect(url01, function(err, database) {
            if (err) {
                throw err;
            }
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
		MongoClient.connect(url01, function(err, database) {
            if (err) {
                throw err;
            }
            getData(database, result);
        });
	};
	
    
    var getData = function(db, response) {
		
		var collection = db.collection(collectionName);
    	collection.find({"filename": "sourceFile.md"}).toArray(function(err, theArray) {

            var body = theArray[0].content
            console.log(body);
            
            fs.writeFile(__dirname + '/sources/sourceFileOut.html', body, function (err) {
			  if (err) throw err;
			  console.log('It\'s saved!');
			  db.close();
			});	
            
			response.end(body);
			
        
        
        });
	};
    
    
    return ReadFileMD;
 
})();

exports.readFileMD = new ReadFileMD();

