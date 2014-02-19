/**
 * @author Dmitry
 */

var express = require('express');
var app = express();
var fs = require('fs');  //
var port = process.env.PORT || 30025;
var file = require('./CreateJson');

//app.use(express.bodyParser());
//var pandoc = require('pdc');

     
app.get('/loadfile', function(request, response) {
  //var q = new QueryMongo();
  var fileContent=fs.readFileSync(__dirname + '/sources/sourceFile.md','utf8');
  //var data = q.getData(response, (fileContent));
  file.readFileMD.loadtoDB(response, fileContent);
  
  
});


app.get('/show', function(request, response) {
	file.readFileMD.saveToHTML(response);
	var html = fs.readFileSync(__dirname + '/sources/sourceFileOut.html');
	response.writeHeader(200, {"Content-Type": "text/html"});   
	response.write(html);
	response.end();
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