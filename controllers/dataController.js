var mongoose = require('mongoose');
var EnvironmentalData = mongoose.model('EnvironmentalData');

exports.addEnvironmentalDataPoint = function(req, res) {
	var dataPoint = new EnvironmentalData();
	dataPoint.set('timestamp', req.body.timestamp);
	dataPoint.set('harvest', req.harvest.id);
	dataPoint.set('temperature', req.body.temperature);
	dataPoint.set('humidity', req.body.humidity);
	dataPoint.set('uv', req.body.uv);
	dataPoint.set('lux', req.body.lux);
	dataPoint.set('co2', req.body.co2);
	harvest.save(function(err) {
		if (err) {
			res.status(500).send();
			return;
		}
		res.status(200).send();
	});
}
exports.getDataForHarvest = function(req, res) {
	var body = "";
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
		res.body = body;
		res.status(200).send();
	});
}