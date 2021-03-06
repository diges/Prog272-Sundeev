

var format = require('util').format;
var fs = require('fs');
var qm = require('./library/QueryMongo');
var queryMongo = qm.QueryMongo; 

var http = require('http');
var express = require('express');
var app = express();

//Configuration
app.configure(function(){'use strict';
	app.set('port', process.env.PORT || 30025);
	//app.set('views', __dirname + '/views');
	//app.set('views engine', 'jade');

		//middleware
	app.use(express.bodyParser());
	//app.use(express.methodOverride());
	//app.use(app.router); //order of routs,  call static last
	app.use("/library", express.static(__dirname + '/library'));
	app.use("/t", express.static(__dirname + '/test'));
	app.use("/sources", express.static(__dirname + '/sources'));
	app.use("/", express.static(__dirname + '/public'));

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

app.get('/deleteid/:id', function(request, response) { 'use strict';
	queryMongo.deleteCollectionCombo(response, request.params.id);
	response.send({result:"success"});
});

app.get('/import', function(request, response) {'use strict';
  var fileContent = fs.readFileSync('./sources/Shakespeare_db.json', 'utf8');
  queryMongo.insertIntoCollection(JSON.parse(fileContent));
  response.send({result:"success"});
});

app.post('/add', function(request, response) {'use strict';
  var obj = request.body.obj;
  console.log(obj);
  queryMongo.insertIntoCollection(JSON.parse(obj));
  response.send({result:"success"});
});




// Default.
app.get('/', function(request, result) {'use strict';
	//var html = fs.readFileSync(__dirname + '/public/index_old.html');
	var html = fs.readFileSync(__dirname + '/public/index.html');
	result.writeHeader(200, { "Content-Type" : "text/html" });
	result.write(html);
	result.end();
});


http.createServer(app).listen(app.get('port'), function(){'use strict';
	console.log('Listening on port ' + app.get('port'));
});
