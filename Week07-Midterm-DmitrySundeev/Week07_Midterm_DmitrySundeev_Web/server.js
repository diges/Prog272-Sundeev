

var format = require('util').format;
var fs = require('fs');
var qm = require('./library/QueryMongo');
var queryMongo = qm.QueryMongo; 

var http = require('http');
var express = require('express');
var app = express();

//Configuration
app.configure(function(){
	app.set('port', process.env.PORT || 30025);
	//app.set('views', __dirname + '/views');
	//app.set('views engine', 'jade');

		//middleware
	app.use(express.bodyParser());
	//app.use(express.methodOverride());
	//app.use(app.router); //order of routs,  call statics last
	app.use("/", express.static(__dirname + '/public'));
	//app.use("/", express.static(__dirname + '/library'));
});




// Read the collection
app.get('/readAll', function(request, response) {'use strict';
	queryMongo.getCollection(response);
});

app.get('/keyword/:word?', function(request, response) { 'use strict';
	var parametr=request.param('word','poem');
	//response.send(parametr);
	queryMongo.getCollectionFiltered(response, parametr);
});

app.get('/mongoid/:id', function(request, response) { 'use strict';
	queryMongo.getCollectionCombo(response, request.params.id);
});

app.get('/import', function(request, response) {'use strict';
  var fileContent = fs.readFileSync('./sources/Shakespeare_db.json', 'utf8');
  queryMongo.insertIntoCollection(JSON.parse(fileContent));
  response.send({result:"success"});
});



// Default.
app.get('/', function(request, result) {'use strict';
	var html = fs.readFileSync(__dirname + '/public/index.html');
	result.writeHeader(200, { "Content-Type" : "text/html" });
	result.write(html);
	result.end();
});


http.createServer(app).listen(app.get('port'), function(){
	console.log('Listening on port ' + app.get('port'));
});
