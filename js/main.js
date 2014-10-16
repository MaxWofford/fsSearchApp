var config = {
  'secrets' : {
    'clientId' : 'SDSGM5KCYH2APPOD1GDDA5NT312Q1BOZY5FQYJDVVEDYUBY2',
    'clientSecret' : '5GK2Q4GFOI0W3KQYEKM1KYKGJKJIRDIN0RAH5OI1WU4CRIQS',
 	'redirectUrl' : 'http://localhost:8080/callback'
  }
}

var query = 'coffee';

var options = {
	host: 'api.foursquare.com',
	port: 443,
	path: '/v2/venues/search?client_id=' + config.secrets.clientId + '&client_secret=' + 
		config.secrets.clientSecret + '&v=20141016&ll=40.7,-74&query=' + query,
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
};

var express     = require('express'),
app             = express(),
foursquare      = require('node-foursquare')(config),
http 			= require("http"),
https 			= require("https");

// var req = https.request(options, function(res) {
// 	console.log('STATUS: ' + res.statusCode);
// 	console.log('HEADERS: ' + JSON.stringify(res.headers));

// 	var dataChunks = [];
// 	res.on('data', function(chunk) {
// 		dataChunks.push(chunk);
// 	}).on('end', function() {
// 		var body = Buffer.concat(dataChunks);
// 		console.log('BODY: ' + body);
// 	});
// 	req.end();
// });

var router = express.Router();

router.get('/start', function(reqblah, response) {
	console.log('in start');
	console.log('STATUS: ' + reqblah.statusCode);
	var req = https.request(options, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));

		var dataChunks = [];
		res.on('data', function(chunk) {
			dataChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(dataChunks);
			console.log('BODY: ' + body);
			response.json(body.stringify());
		});
	});
	req.end();
	// console.log('req: ' + req);
	// response.json({ message: req });
	// response.json();
});

app.use('/api', router);

// req.on('error', function(error) {
// 	console.log('ERROR: ' + error.message);
// });

/*
var search = function(options, query, error_handler) {
	if (error_handler) {
		console.log("ERROR!");
	} 
	else {
		var prot = options.port == 443 ? https : http;
		var req = prot.request(options, function(res) {

			var output = '';
			console.log(options.host + ':' + res.statusCode);
			res.setEncoding('utf8');

			res.on('data', function(chunk) {
				output += chunk;
			});

			res.on('end', function() {
				var obj = JSON.parse(output);
				onResult(res.statusCode, obj);
			})
		})
		req.end();
		console.log(query);
	}
}
*/

//var onResult = function(status, object) {
//	console.log(object);
//}

//app.get('/', function(req, res) {
//	res.render("index.html");
//});

var server = app.listen(8080, function (){
  
  var host = server.address().address
  var port = server.address().port

  console.log('app listening at http://%s:%s', host, port)

})