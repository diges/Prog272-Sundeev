/**
 * @author Dmitry
 */

var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs = require('fs');
var port = process.env.PORT || 30025;
app.use(express.bodyParser());

var QueryMongo = (function() {
 
    var url01 = 'mongodb://127.0.0.1:27017/test';
    
    function QueryMongo() {
 
    }
 
    QueryMongo.prototype.getData = function(result, fileContent) {
        console.log('Called getData');
        // Open the test database that comes with MongoDb
        MongoClient.connect(url01, function(err, database) {
            if (err) {
                throw err;
            }
            console.log('IngetDataCallback');
            insertIntoCollection(database, 'test_insert', fileContent);
            getCollection(database, result);
        });
    };
    
    var getCollection = function(database, response) {
 
        var collection = database.collection('test_insert');
 
        // View the collection
        collection.find().toArray(function(err, theArray) {
            console.dir(theArray);
            var body = '<html><body><h2>Mongo Data: ' + theArray[2].firstName + '</h2>';
            body += "<p>This HTML is hardcoded into Server.js. See the getCollection method.</p></body></html>";
            response.setHeader('Content-Type', 'text/html');
            response.setHeader('Content-Length', Buffer.byteLength(body));
            response.end(body);
            database.close();
        });
 
    };
    
     var insertIntoCollection = function(db, collectionName, objectToInsert) {
 
        var collection = db.collection(collectionName);
        collection.insert(objectToInsert, function(err, docs) {
            if (err) {
                throw err;
            }
            console.log("insert succeeded");
        });
    };
 
    return QueryMongo;
 
})();
     
app.get('/', function(request, response) {
  var q = new QueryMongo();
  //var data = q.getData(response);
  var fileContent=fs.readFileSync(__dirname + '/sources/sourceFile.md','utf8');
  var data = q.getData(response, JSON.parse(fileContent));
});
 


app.get('/', function(request, response) {
	var html = fs.readFileSync(__dirname + '/public/index.html');
	response.writeHeader(200, {"Content-Type": "text/html"});   
	response.write(html);
	response.end();
});

app.use("/", express.static(__dirname + '/public'));
app.listen(port);
console.log('Listening on port :' + port);