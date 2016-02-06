var mongoose = require('mongoose');
var EnvironmentalData = mongoose.model('EnvironmentalData');

exports.addEnvironmentalDataPoint = function(req, res) {
	console.log("adding data point!");
	var dataPoint = new EnvironmentalData();
	dataPoint.set('timestamp', req.query.timestamp);
	dataPoint.set('harvest', req.harvest.id);
	dataPoint.set('temperature', req.query.temperature);
	dataPoint.set('humidity', req.query.humidity);
	dataPoint.set('uv', req.query.uv);
	dataPoint.set('lux', req.query.lux);
	dataPoint.set('co2', req.query.co2);
	dataPoint.save(function(err) {
		if (err) {
			res.status(500).send();
			return;
		}
		res.status(200).send();
	});
}
exports.getDataForHarvest = function(req, res) {
	EnvironmentalData.find({harvest: req.harvest.id}).sort('timestamp').exec(function(err, dataPoints) {
		if (err) {
			res.status(500).send();
			return;
		}
		var body = '';
		for (var i = 0; i < dataPoints.length; i++) {
			var dataPoint = dataPoints[i];
			body += dataPoint.timestamp.toString();
			body += ',';
			body += dataPoint.temperature.toString();
			body += ',';
			body += dataPoint.humidity.toString();
			body += ',';
			body += dataPoint.uv.toString();
			body += ',';
			body += dataPoint.lux.toString();
			body += ',';
			body += dataPoint.co2.toString();
			if (i < dataPoints.length - 1) body += '\n';
		}
		console.log(body);
		res.status(200).send(body);
	});
}