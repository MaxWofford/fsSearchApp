var express     = require('express'),
app             = express(),
http 			= require("http"),
https 			= require("https");

module.exports = function() {

var config = {
  'secrets' : {
    'clientId' : 'SDSGM5KCYH2APPOD1GDDA5NT312Q1BOZY5FQYJDVVEDYUBY2',
    'clientSecret' : '5GK2Q4GFOI0W3KQYEKM1KYKGJKJIRDIN0RAH5OI1WU4CRIQS',
 	'redirectUrl' : 'http://localhost:8080/callback'
  }
}

var query = "coffee";

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
			var stringBody = body.toString('utf-8');
			var parsedData = JSON.parse(stringBody);
			response.json(parsedData);
		});
	});
	req.end();

	req.on('error', function(error) {
		console.log('ERROR: ' + error.message);
	});
});

app.use('/root', router);


//var onResult = function(status, object) {
	//console.log(object);
//}

// router.get('/index', function(req, res) {
// 	console.log(res);
// 	res.render('index.html', {'Content-Type': 'text/html'});
// });

var server = app.listen(8080, function (){
  
  var host = server.address().address
  var port = server.address().port

  console.log('app listening at http://%s:%s', host, port)

})

}