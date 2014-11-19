module.exports = function(app, query, callback) {

	var http = require('http');
  	var https = require('https');
	var secrets = require('./config');
	// We'll get our API keys from a config file if we can't find an 'FS_CLIENT_ID' environmental variable
	var foursquareClientId = process.env.FS_CLIENT_ID || secrets.foursquare.clientId;
	var foursquareClientSecret = process.env.FS_CLIENT_SECRET || secrets.foursquare.clientSecret;

	var options = {
		host: 'api.foursquare.com',
		port: 443,
		path: '/v2/venues/explore?client_id=' + foursquareClientId + '&client_secret=' + 
			foursquareClientSecret + '&v=20141021&ll=40.72078,-74.001119&query=' + query,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};

		var req = https.request(options, function(res) {
			var dataChunks = [];
			res.on('data', function(chunk) {
				dataChunks.push(chunk);
			}).on('end', function() {
				var body = Buffer.concat(dataChunks);
				var stringBody = body.toString('utf-8');
				var parsedData = JSON.parse(stringBody);
			// Log our API call
	        console.log(options.host + options.path);
	    	callback(null, parsedData);
			});
		});
		req.end();

		req.on('error', function(error) {
			console.log('ERROR: ' + error.message);
		});
}
