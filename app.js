
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var mongodb = require("mongodb"),
	mongoserver = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT, {auto_reconnect:true}),
	db_connector = new mongodb.Db('BrowsingData', mongoserver, {safe:true});

var app = express();

db_connector.open(function(err, db){


	// all environments
	app.set('port', process.env.PORT || 4000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	app.post('/save', function(req, resp){
		console.log(req.body);
		collection = db.collection('logging');
		collection.insert(req.body, {safe:true}, function(err,data){
			if(err) console.log(err);
		});
	});

	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});


});