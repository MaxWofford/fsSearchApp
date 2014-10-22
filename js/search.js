module.exports = function(app, query, callback) {
  
  var http = require('http');
  var https = require('https');

 

	var options = {
		host: 'api.foursquare.com',
		port: 443,
		path: '/v2/venues/explore?client_id=' + app.secrets.clientId + '&client_secret=' + 
			app.secrets.clientSecret + '&v=20141021&ll=40.7,-74&query=' + query,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};

		var req = https.request(options, function(res) {
			//console.log('STATUS: ' + res.statusCode);
			//console.log('HEADERS: ' + JSON.stringify(res.headers));
      		//console.log(options.host + options.path);
			var dataChunks = [];
			res.on('data', function(chunk) {
				dataChunks.push(chunk);
			}).on('end', function() {
				var body = Buffer.concat(dataChunks);
				var stringBody = body.toString('utf-8');
				var parsedData = JSON.parse(stringBody);
        //console.log(stringBody);
            console.log(options.host, options.path);
        callback(null, parsedData);
			});
		});
		req.end();

		req.on('error', function(error) {
			console.log('ERROR: ' + error.message);
		});


//var onResult = function(status, object) {
	//console.log(object);
//}

// router.get('/index', function(req, res) {
// 	console.log(res);
// 	res.render('index.html', {'Content-Type': 'text/html'});
// });
}
