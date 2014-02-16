/**
 * @author Dmitry
 */

var express = require('express');
var app = express();
var fs = require('fs');
var FinM = require('./library/logic');
//var addingMachine = require('./Library/AddingMachine');
app.use(express.bodyParser());

var port = process.env.PORT || 30025;

app.get('/feetinmile', function(request, response) {
	console.log('FeetInMile called');
	response.send({ "result": FinM.myObj.FeetInMile() });
});

// With a get, the parameters are passed in request.query
app.get('/feetinmiles', function(request, response) {
	console.log('miles called');	
	console.log(request.query);	
	var miles = parseInt(request.query.miles);
	var result = FinM.myObj.FeetInMileS(miles);
	response.send({ "result": result });
});

/* To handle a post, we have to add express.bodyParser, shown above
   Now our parameters come in on request.body */
app.post('/circumference', function(request, response) {
	console.log('circumference called');	
	console.log(request.body);	
	var radius = parseInt(request.body.radius);
	var result = FinM.myObj.circumference(radius);
	response.send({ "result": result });
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