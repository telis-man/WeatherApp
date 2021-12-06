let express = require('express');
let router = express.Router();

const https = require('https');


router.get('/places', function(req, res, next) {

	https.get('https://api.meteo.lt/v1/places', response => {
	let result = '';

	response.on('data', function(data) {
		result += data.toString();
	});

	response.on('end', function(data) {

		//let names = Object.keys(result);
		res.send(result);
	});
});
});


router.get(`/long-term/:code`, function(req, res, next) {

	https.get(`https://api.meteo.lt/v1/places/${req.params['code']}/forecasts/long-term`, response => {
	let result = '';

	response.on('data', function(data) {
		result += data.toString();
	});

	response.on('end', function(data) {

		//let names = Object.keys(result);
		res.send(result);
	});
});
});

module.exports = router;
